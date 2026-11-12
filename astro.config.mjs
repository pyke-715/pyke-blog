import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * 部署后把 SITE_URL 设成真实域名（例如 https://blog.pyke.dev），
 * canonical / RSS / sitemap / OG 都会用它；不设时回退到占位域名。
 */
const site = process.env.SITE_URL ?? 'https://example.com';

export default defineConfig({
  site,
  integrations: [
    // 搜索结果页带 noindex，不放进 sitemap
    sitemap({ filter: (page) => !page.includes('/search') }),
  ],
  devToolbar: { enabled: false },
});
