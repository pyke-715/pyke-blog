/**
 * 中文标签 → 英文 URL slug 映射表。
 *
 * 约定：
 * - 只放中文（非 ASCII）标签，英文标签不要写进来，它们会被自动规范化后直接使用
 * - 值必须是纯小写 ASCII，推荐用 `-` 连接
 * - 新增中文标签时在这里补一行，否则构建时会警告并回退成 URL 编码
 */
export const tagSlugMap: Record<string, string> = {
  前端: 'frontend',
  后端: 'backend',
  数据库: 'database',
  工具链: 'tooling',
  踩坑: 'troubleshooting',
  随笔: 'essay',
  生活: 'life',
  折腾: 'tinkering',
  性能: 'performance',
  架构: 'architecture',
  源码: 'source-code',
  读书: 'reading',
};
