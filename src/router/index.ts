import { isMpWeixin } from '@uni-helper/uni-env'
import { pages, subPackages } from 'virtual:uni-pages'
import { useAuthStore } from '@/store/auth'
import { authConfig, createLoginLocation, createPostLoginLocation, requiresAuth } from './auth'

function generateRoutes() {
  const routes = pages.map((page) => {
    const newPath = `/${page.path}`
    return { ...page, path: newPath }
  })
  if (subPackages && subPackages.length > 0) {
    subPackages.forEach((subPackage) => {
      const subRoutes = subPackage.pages.map((page: any) => {
        const newPath = `/${subPackage.root}/${page.path}`
        return { ...page, path: newPath }
      })
      routes.push(...subRoutes)
    })
  }
  return routes
}

const router = createRouter({
  routes: generateRoutes(),
})
router.beforeEach((to, from, next) => {
  // 登录拦截顺序：小程序兼容 -> 登录态检查 -> 登录页处理 -> 回跳地址 -> 策略判断。
  // 所有平台均使用 uni-app 路由和存储，不依赖 window/location。
  if (isMpWeixin) {
    // 微信小程序页面栈切换不支持浏览器 History API；路由对象缺失时安全回退首页。
    if (!to || !to.path) {
      return next({ path: authConfig.homePath })
    }
  }
  const authStore = useAuthStore()
  const loggedIn = authStore.ensureValid()
  const isLoginPage = to.name === authConfig.loginName || to.path === authConfig.loginPath

  if (isLoginPage && loggedIn) {
    return next(createPostLoginLocation(to))
  }

  if (!loggedIn && requiresAuth(to)) {
    if (to.path === authConfig.loginPath) {
      return next()
    }
    return next(createLoginLocation(to))
  }

  console.log('🚀 beforeEach 守卫触发:', { to, from })

  // 演示：基本的导航日志记录
  if (to.path && from.path) {
    console.log(`📍 导航: ${from.path} → ${to.path}`)
  }

  // 演示：对受保护页面的简单拦截
  if (to.name === 'demo-protected') {
    const { confirm: showConfirm } = useGlobalDialog()
    console.log('🛡️ 检测到访问受保护页面')

    return new Promise<void>((resolve, reject) => {
      showConfirm({
        title: '守卫拦截演示',
        msg: '这是一个受保护的页面，需要确认后才能访问',
        confirmButtonText: '允许访问',
        cancelButtonText: '取消',
        success() {
          console.log('✅ 用户确认访问，允许导航')
          next()
          resolve()
        },
        fail() {
          console.log('❌ 用户取消访问，阻止导航')
          next(false)
          reject(new Error('用户取消访问'))
        },
      })
    })
  }

  // 继续导航
  next()
})

router.afterEach((to, from) => {
  console.log('🎯 afterEach 钩子触发:', { to, from })

  // 演示：简单的页面切换记录
  if (to.path) {
    console.log(`📄 页面切换完成: ${to.path}`)
  }

  // 演示：针对 afterEach 演示页面的简单提示
  if (to.name === 'demo-aftereach') {
    const { show: showToast } = useGlobalToast()
    console.log('📊 进入 afterEach 演示页面')
    setTimeout(() => {
      showToast('afterEach 钩子已触发！')
    }, 500)
  }
})

export default router
