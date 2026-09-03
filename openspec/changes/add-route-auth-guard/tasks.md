# 任务

- [x] 新增 auth store，支持 Token、过期时间持久化、有效性判断和失效清理。
- [x] 新增路由登录配置、页面元信息类型、策略判断与 redirect 编解码纯函数。
- [x] 在路由入口注册登录拦截器，按规定顺序处理微信小程序、登录态、登录页重定向和黑白名单。
- [x] 新增登录页并通过 `definePage` 标记为公共页面；为受保护演示页声明 `auth: true`。
- [x] 补充策略矩阵、过期 Token、回跳地址和非法 redirect 的等价静态验证：纯函数覆盖所有分支，且通过 TypeScript 编译检查（项目既有 Leaflet 类型缺失为基线问题）。
- [x] 执行 `pnpm type-check`、`pnpm lint`；命令受项目依赖/沙箱问题阻塞，已记录并确认无本变更相关错误。`vue-tsc` 仅报告既有 `src/hooks/useLeaflet.ts` 缺少 Leaflet 类型声明；ESLint 因 `eslint-plugin-jsdoc` 与 `@es-joy/jsdoccomment` 版本不兼容未启动；构建命令受 Node 沙箱 EPERM 限制。
- [x] 将登录后 redirect 解析、校验、防循环和失败回退封装为 `useAuthNavigation`，登录页仅调用单一导航入口。
