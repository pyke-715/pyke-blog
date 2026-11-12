/**
 * 搜索核心：只处理标题与标签，不碰正文。
 *
 * 不用 Fuse.js 的理由：Fuse 默认按空格分词，中文标题会被当成一个超长 token，
 * 打分很差；这里的语料只有标题和标签，自写匹配器更准也更好测。
 */

export interface SearchItem {
  title: string;
  tags: string[];
  category: string;
  url: string;
  date: string;
}

export type SearchMode = 'fuzzy' | 'exact';

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/** 字符子序列匹配：needle 的字符按顺序出现在 haystack 中即可 */
function isSubsequence(needle: string, haystack: string): boolean {
  if (!needle) return false;
  let index = 0;
  for (const char of haystack) {
    if (char === needle[index]) index += 1;
    if (index === needle.length) return true;
  }
  return false;
}

function score(item: SearchItem, query: string): number {
  const title = normalize(item.title);
  let total = 0;

  if (title === query) total += 100;
  else if (title.includes(query)) total += 60;
  else if (isSubsequence(query, title)) total += 25;

  for (const rawTag of item.tags) {
    const tag = normalize(rawTag);
    if (tag === query) total += 80;
    else if (tag.includes(query)) total += 45;
    else if (isSubsequence(query, tag)) total += 15;
  }

  return total;
}

/** 精确：标题包含完整关键词，或标签与关键词完全相等 */
export function searchExact(items: SearchItem[], query: string): SearchItem[] {
  const keyword = normalize(query);
  if (!keyword) return [];

  return items.filter(
    (item) =>
      normalize(item.title).includes(keyword) ||
      item.tags.some((tag) => normalize(tag) === keyword),
  );
}

/** 模糊：完全匹配 > 包含 > 子序列，按分数降序，同分新文章在前 */
export function searchFuzzy(items: SearchItem[], query: string): SearchItem[] {
  const keyword = normalize(query);
  if (!keyword) return [];

  return items
    .map((item) => ({ item, value: score(item, keyword) }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value || b.item.date.localeCompare(a.item.date))
    .map((entry) => entry.item);
}

export function search(items: SearchItem[], query: string, mode: SearchMode): SearchItem[] {
  return mode === 'exact' ? searchExact(items, query) : searchFuzzy(items, query);
}
