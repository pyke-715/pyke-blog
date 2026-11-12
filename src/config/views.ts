/**
 * 阅读量数据源。
 *
 * 目前只有本地占位实现（`local`）：只写当前浏览器的 localStorage，不发任何请求。
 * 以后接真实服务时，在 src/lib/views.ts 注册新 provider，再把这里改成它的 id。
 */
export const viewsProviderId = 'local';
