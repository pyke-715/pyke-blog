export interface Friend {
  name: string;
  url: string;
  description?: string;
}

/**
 * 友链数据：只改这个文件，页面不用动。
 * 目前是占位示例，替换成真实的友链即可。
 */
export const friends: Friend[] = [
  {
    name: 'Astro',
    url: 'https://astro.build',
    description: '占位示例：本站所用框架的官网',
  },
  {
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: '占位示例：前端参考手册',
  },
];
