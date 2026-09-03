# 设计

## 架构

- 在 `src/store/auth.ts` 提供 Pinia 登录状态：`token`、`expiresAt`、`isLoggedIn`、`setToken`、`clearAuth`。使用项目已有持久化插件和 uni storage，Token 过期判断集中在 store 内。
- 在 `src/router/auth.ts` 提供纯函数和类型：全局 `authConfig`（`mode`、`loginPath`、`homePath`、`blacklist`、`whitelist`），页面元信息类型 `PageAuthMeta`，`requiresAuth`、`buildRedirect`、`resolveRedirect` 等方法。
- 在 `src/composables/useAuthNavigation.ts` 提供页面侧高内聚导航入口，集中处理回跳参数读取、兼容解码、安全校验、防循环与失败回退；登录页不直接依赖具体 query 名称和路由规则。
- `src/router/index.ts` 在现有 `beforeEach` 中首先调用登录守卫；登录守卫返回放行、阻止或重定向结果，再执行已有演示逻辑。
- 页面使用 `definePage({ auth: true })` 或 `definePage({ auth: false })` 声明覆盖项；登录页使用 `auth: false` 与固定名称/路径标识。

## 路由决策

1. 识别微信小程序环境并读取 uni-app 可用的当前页面信息。
2. 读取 auth store，执行过期清理并得到 `isLoggedIn`。
3. 若目标为登录页：已登录则解析 `redirect` 并重定向，否则放行。
4. 构建目标完整地址作为 `redirect`。
5. 根据页面显式 `auth` 和全局黑/白名单策略判断是否需要登录；需要且未登录则重定向登录页。

## 回跳安全

仅允许应用内部绝对路径（以 `/` 开头且不包含协议）作为 redirect；非法或外部地址丢弃并回退首页，防止开放重定向。重定向参数使用 `encodeURIComponent`/路由 query 编解码，避免查询字符串丢失。

登录完成后页面仅调用 `redirectAfterLogin()`。路由 query 参数名由 `authConfig.redirectQueryKey` 配置，目标解析和导航失败降级均由导航模块内部负责。

## 兼容性与验证

- H5、App、微信小程序均通过 `uni.getStorageSync/setStorageSync` 读写登录态。
- 不在守卫中直接访问 `window` 或 `location`。
- 使用 TypeScript 类型检查、ESLint；增加针对策略矩阵、Token 过期、redirect 编解码的单元级纯函数测试（若项目测试基础设施不可用，则提供可执行的类型安全实现并在任务中记录手工验证）。
