export interface NavItem {
  label: string;
  href: string;
}

/**
 * 站点级配置的唯一入口。
 * 导航项在 L2 才会填充，L0 只保证结构存在。
 */
export const site = {
  name: 'Pyke Blog',
  description: '记录技术、问题与日常',
  author: 'pyke',
  nav: [] as NavItem[],
};
