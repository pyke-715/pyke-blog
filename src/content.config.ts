import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Astro 7 起 astro:content 的 z 已废弃，统一从 astro/zod 引入
import { z } from 'astro/zod';

/**
 * 文章集合。
 * - 一个 md 文件 = 一篇文章，文件名（entry.id）即 URL slug，分类不进入 URL
 * - category 单值字符串，只做前端标识
 * - tags 多值数组，显示原文，URL 中使用映射/规范化后的英文 slug
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
