import type { APIRoute } from 'astro';
import { getPublishedPosts, postHref } from '../lib/posts';
import { toISODate } from '../lib/date';

/**
 * 构建期生成的搜索索引：只含标题与标签相关字段，不含正文。
 * 输出到 /search-index.json。
 */
export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const items = posts.map((post) => ({
    title: post.data.title,
    tags: post.data.tags,
    category: post.data.category,
    url: postHref(post),
    date: toISODate(post.data.pubDate),
  }));

  return new Response(JSON.stringify(items), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
