import { getCollection } from 'astro:content';
import { toTagSlug, type Post } from './taxonomy';

/** 文章地址：分类不进入 URL，只有 slug */
export function postHref(post: Post): string {
  return `/posts/${post.id}`;
}

/** 已发布文章，按发布时间倒序；草稿永不出现 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 按分类筛选 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.category === category);
}

/** 按标签原文筛选 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

/** 按标签 slug 筛选（标签页用） */
export async function getPostsByTagSlug(slug: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.tags.some((tag) => toTagSlug(tag) === slug));
}
