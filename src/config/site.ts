export interface NavItem {
  label: string;
  href: string;
}

/**
 * 站点级配置的唯一入口。
 */
export const site = {
  name: 'Pyke Blog',
  description: '记录技术、问题与日常',
  author: 'pyke',
  nav: [
    { label: '首页', href: '/' },
    { label: '归档', href: '/archive' },
    { label: '关于', href: '/about' },
  ] satisfies NavItem[],
};
