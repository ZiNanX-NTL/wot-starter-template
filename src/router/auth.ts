import type { RouteLocationNormalized } from '@wot-ui/router'

export type AuthMode = 'blacklist' | 'whitelist'

export interface PageAuthMeta {
  auth?: boolean
}

export interface AuthConfig {
  mode: AuthMode
  loginPath: string
  loginName: string
  homePath: string
  redirectQueryKey: string
  blacklist: string[]
  whitelist: string[]
}

export const authConfig: AuthConfig = {
  mode: 'blacklist',
  loginPath: '/pages/login/index',
  loginName: 'login',
  homePath: '/pages/index/index',
  redirectQueryKey: 'redirect',
  blacklist: ['/subPages/router/demo-protected'],
  whitelist: ['/pages/login/index', '/pages/index/index', '/pages/about/index'],
}

export function configureAuth(config: Partial<AuthConfig>) {
  Object.assign(authConfig, config)
  return authConfig
}

function normalizePath(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

export function buildRedirect(to: Pick<RouteLocationNormalized, 'path' | 'query' | 'hash'>) {
  const query = Object.entries(to.query || {})
    .flatMap(([key, value]) => {
      if (value == null) {
        return []
      }
      const values = Array.isArray(value) ? value : [value]
      return values
        .filter(item => item != null)
        .map(item => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`)
    })
    .join('&')
  const hash = to.hash ? (to.hash.startsWith('#') ? to.hash : `#${to.hash}`) : ''
  return `${normalizePath(to.path)}${query ? `?${query}` : ''}${hash}`
}

export function createLoginLocation(
  to: Pick<RouteLocationNormalized, 'path' | 'query' | 'hash'>,
  config = authConfig,
) {
  return {
    path: config.loginPath,
    query: {
      [config.redirectQueryKey]: buildRedirect(to),
    },
  }
}

export function resolveRedirect(value: unknown, fallback = authConfig.homePath) {
  if (typeof value !== 'string') {
    return fallback
  }

  const redirect = decodeRedirect(value)
  const pathname = redirect.split(/[?#]/, 1)[0]
  if (
    !pathname.startsWith('/')
    || pathname.startsWith('//')
    || pathname.includes('\\')
    || [...redirect].some(char => char.charCodeAt(0) <= 0x1F)
  ) {
    return fallback
  }
  return redirect
}

export function requiresAuth(
  to: Pick<RouteLocationNormalized, 'path' | 'meta'> & Partial<PageAuthMeta>,
  config = authConfig,
) {
  const pageAuth = {
    ...((to.meta || {}) as PageAuthMeta),
    ...(typeof to.auth === 'boolean' ? { auth: to.auth } : {}),
  }
  if (pageAuth.auth === true) {
    return true
  }
  if (pageAuth.auth === false) {
    return false
  }
  const path = normalizePath(to.path)
  return config.mode === 'blacklist'
    ? config.blacklist.some(item => normalizePath(item) === path)
    : !config.whitelist.some(item => normalizePath(item) === path)
}

function decodeRedirect(value: string) {
  if (value.startsWith('/')) {
    return value
  }
  try {
    return decodeURIComponent(value)
  }
  catch {
    return ''
  }
}

export function getPostLoginPath(
  to: Pick<RouteLocationNormalized, 'query'>,
  config = authConfig,
) {
  const redirect = resolveRedirect(to.query?.[config.redirectQueryKey], config.homePath)
  return redirect === config.loginPath ? config.homePath : redirect
}

export function createPostLoginLocation(
  to: Pick<RouteLocationNormalized, 'query'>,
  config = authConfig,
) {
  const path = getPostLoginPath(to, config)
  return {
    path,
    // 首页通常是 tabBar 页面，replaceAll 可同时兼容 H5 与小程序页面栈。
    navType: path === config.homePath ? 'replaceAll' as const : 'replace' as const,
  }
}
