import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postHref } from '../lib/posts';
import { site } from '../config/site';

/** 订阅源：只含已发布文章，按发布时间倒序 */
export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description ?? '',
      link: postHref(post),
    })),
    customData: '<language>zh-cn</language>',
  });
}
