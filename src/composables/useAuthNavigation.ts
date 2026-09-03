import type { RouteLocationNormalized, Router } from '@wot-ui/router'
import { useRoute, useRouter } from '@wot-ui/router'
import { authConfig, createPostLoginLocation } from '@/router/auth'

type AuthRouter = Pick<Router, 'replace' | 'replaceAll'>
type AuthRoute = Pick<RouteLocationNormalized, 'query'>

export async function navigateAfterLogin(
  router: AuthRouter,
  route: AuthRoute,
) {
  const target = createPostLoginLocation(route)

  try {
    await router.replace(target)
  }
  catch (error) {
    if (target.path === authConfig.homePath) {
      throw error
    }
    await router.replaceAll({ path: authConfig.homePath })
  }
}

export function useAuthNavigation() {
  const router = useRouter()
  const route = useRoute()

  return {
    redirectAfterLogin: () => navigateAfterLogin(router, route),
  }
}
