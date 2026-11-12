export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
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

  /** 首页 hero 标题，可自定义 */
  heroTitle: 'Pyke Blog',

  /**
   * 首页背景图：文件名放在 src/assets/hero/ 下，交给 Astro <Image> 优化；
   * 留空字符串则不显示背景。
   */
  heroImage: 'hero.jpg',

  nav: [
    { label: '首页', href: '/' },
    { label: '归档', href: '/archive' },
    { label: '友链', href: '/friends' },
    { label: '关于', href: '/about' },
  ] satisfies NavItem[],

  social: [
    { label: 'GitHub', href: 'https://github.com/pyke-715' },
  ] satisfies SocialLink[],
};
