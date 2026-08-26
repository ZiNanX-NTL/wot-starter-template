export interface TabbarItem {
  name: string
  value?: number
  active: boolean
  title: string
  type?: 'default' | 'icon' | 'image'
  /** type: default,icon使用unocss icon */
  icon?: string
  iconActive?: string
  /** type: image使用 */
  src?: string
  srcActive?: string
}

const tabbarItems = ref<TabbarItem[]>([
  { name: 'home', active: true, title: '首页', icon: 'home' },
  { name: 'about', active: false, title: '关于', icon: 'user' },
  { name: 'about', active: false, title: '关于', type: 'icon', icon: 'i-cuida-warning-outline' },
])

export function useTabbar() {
  const tabbarList = computed(() => tabbarItems.value)

  const activeTabbar = computed(() => {
    const item = tabbarItems.value.find(item => item.active)
    return item || tabbarItems.value[0]
  })

  const getTabbarItemValue = (name: string) => {
    const item = tabbarItems.value.find(item => item.name === name)
    return item?.value
  }

  const setTabbarItem = (name: string, value: number) => {
    const tabbarItem = tabbarItems.value.find(item => item.name === name)
    if (tabbarItem) {
      tabbarItem.value = value
    }
  }

  const setTabbarItemActive = (name: string) => {
    tabbarItems.value.forEach((item) => {
      if (item.name === name) {
        item.active = true
      }
      else {
        item.active = false
      }
    })
  }

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarItemActive,
  }
}
