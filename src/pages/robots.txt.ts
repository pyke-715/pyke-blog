import type { APIContext } from 'astro';

/** robots.txt：允许全站抓取，并指向 sitemap 索引 */
export function GET(context: APIContext) {
  const site = context.site ?? new URL('https://example.com');
  const sitemap = new URL('sitemap-index.xml', site);

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap.toString()}`, ''].join('\n');

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
