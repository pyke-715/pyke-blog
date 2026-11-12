import type { CollectionEntry } from 'astro:content';
import { tagSlugMap } from '../data/tag-slugs';

export type Post = CollectionEntry<'posts'>;

/** 纯 ASCII（可打印字符）判定：满足则无需映射表 */
const ASCII_ONLY = /^[\x20-\x7E]+$/;

/** 合法 slug：小写字母、数字、点、下划线、波浪线、连字符 */
const VALID_SLUG = /^[a-z0-9._~-]+$/;

const warned = new Set<string>();

function warnOnce(key: string, message: string): void {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(message);
}

/** ASCII 标签规范化：小写、空白转连字符、非法字符转连字符、收敛重复连字符 */
function normalizeAscii(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._~-]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 标签名 → URL slug。
 *
 * 1. 纯 ASCII：自动规范化后直接使用（与原值不同会警告）
 * 2. 含非 ASCII：查 tagSlugMap
 * 3. 非 ASCII 且未配映射：回退为 URL 编码并警告
 */
export function toTagSlug(tag: string): string {
  const trimmed = tag.trim();

  if (ASCII_ONLY.test(trimmed)) {
    const slug = normalizeAscii(trimmed);
    if (!slug) {
      throw new Error(
        `[taxonomy] 标签「${tag}」规范化后为空，无法生成 URL slug。请改用有意义的英文标签，或在 src/data/tag-slugs.ts 中为它配置映射。`,
      );
    }
    if (slug !== trimmed) {
      warnOnce(
        `normalize:${trimmed}`,
        `[taxonomy] 标签「${trimmed}」已自动规范化为「${slug}」（URL /tag/${slug}），显示时仍为原文。`,
      );
    }
    return slug;
  }

  const mapped = tagSlugMap[trimmed];
  if (mapped) {
    if (!VALID_SLUG.test(mapped)) {
      throw new Error(
        `[taxonomy] 映射表配置错误：标签「${trimmed}」映射成了「${mapped}」，只允许小写字母、数字与 . _ ~ -。`,
      );
    }
    return mapped;
  }

  warnOnce(
    `missing:${trimmed}`,
    `[taxonomy] 标签「${trimmed}」缺少英文映射，已回退为 URL 编码。请在 src/data/tag-slugs.ts 中补充。`,
  );
  return encodeURIComponent(trimmed);
}

/** 标签页地址 */
export function tagHref(slug: string): string {
  return `/tag/${slug}`;
}

export interface TagSummary {
  /** 显示用原文 */
  name: string;
  /** URL 用 slug */
  slug: string;
  count: number;
}

export interface CategorySummary {
  name: string;
  count: number;
}

/** 校验映射表：英文标签不该出现在表里 */
function validateSlugMap(): void {
  for (const key of Object.keys(tagSlugMap)) {
    if (ASCII_ONLY.test(key)) {
      warnOnce(
        `redundant:${key}`,
        `[taxonomy] 映射表里出现了纯英文标签「${key}」，它无需映射，建议删除以免混淆。`,
      );
    }
  }
}

/**
 * 汇总标签。slug 冲突（两个不同标签指向同一 slug）视为配置错误，直接抛错中断构建。
 */
export function summarizeTags(posts: Post[]): TagSummary[] {
  validateSlugMap();

  const bySlug = new Map<string, { name: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const name = tag.trim();
      const slug = toTagSlug(name);
      const existing = bySlug.get(slug);

      if (!existing) {
        bySlug.set(slug, { name, count: 1 });
        continue;
      }

      if (existing.name !== name) {
        throw new Error(
          `[taxonomy] 标签 slug 冲突：「${existing.name}」与「${name}」都指向「${slug}」。请修改 src/data/tag-slugs.ts 的映射，或调整标签名。`,
        );
      }

      existing.count += 1;
    }
  }

  return [...bySlug.entries()]
    .map(([slug, { name, count }]) => ({ name, slug, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}

/** 汇总分类（分类只做前端标识，不生成独立 URL） */
export function summarizeCategories(posts: Post[]): CategorySummary[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const { category } = post.data;
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}
