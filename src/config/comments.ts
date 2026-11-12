/**
 * 评论数据源。
 *
 * 当前为 `none`：不渲染评论区、不发起任何请求。
 * 以后接 Giscus / Twikoo / Artalk 时，在 src/lib/comments.ts 注册 provider，
 * 把这里改成对应 id 即可，文章页无需改动。
 */
export const commentsProviderId = 'none';
