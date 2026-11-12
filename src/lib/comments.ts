/**
 * 评论 provider 接口。
 *
 * 静态站点没有服务端，评论必须落到某个外部存储（GitHub Discussions / 自建服务 / 数据库）。
 * 这一层只定义"怎么挂"，具体接谁由 src/config/comments.ts 决定；
 * 默认 none：页面不渲染评论区、不加载任何第三方脚本。
 */

export interface CommentContext {
  /** 文章 slug，用于定位评论线程 */
  slug: string;
  /** 评论挂载点 */
  container: HTMLElement;
}

export interface CommentsProvider {
  id: string;
  label: string;
  /** false 时页面完全不渲染评论区 */
  enabled: boolean;
  /** 把评论组件挂到容器上；如有清理逻辑可返回函数 */
  mount(context: CommentContext): void | Promise<void> | (() => void);
}

export const noneCommentsProvider: CommentsProvider = {
  id: 'none',
  label: '不启用',
  enabled: false,
  mount() {
    // 故意留空：未配置评论服务时什么都不做
  },
};

export const commentsProviders: Record<string, CommentsProvider> = {
  none: noneCommentsProvider,
};

export function resolveCommentsProvider(id: string): CommentsProvider {
  return commentsProviders[id] ?? noneCommentsProvider;
}
