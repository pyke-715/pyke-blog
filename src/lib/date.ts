/**
 * 日期格式化。固定使用 Asia/Shanghai，避免构建机器时区不同导致跨日。
 */
const DATE_FORMATTER = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Shanghai',
});

const ISO_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'Asia/Shanghai',
});

/** 2026-11-08 → 2026年11月8日 */
export function formatDate(date: Date): string {
  return DATE_FORMATTER.format(date);
}

/** 2026-11-08 → 2026-11-08（用于 <time datetime>） */
export function toISODate(date: Date): string {
  return ISO_FORMATTER.format(date);
}

/** 取年份，用于归档分组 */
export function getYear(date: Date): string {
  return toISODate(date).slice(0, 4);
}
