import type { ImageMetadata } from 'astro';

/**
 * 全站背景图：从 src/assets/background/ 里按文件名取，
 * 交给 Astro <Image> 做尺寸与格式优化。
 */
const backgroundModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/background/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function getBackgroundImage(fileName?: string): ImageMetadata | undefined {
  const name = fileName?.trim();
  if (!name) return undefined;

  const key = `/src/assets/background/${name}`;
  const module = backgroundModules[key];
  if (!module) {
    console.warn(
      `[background] 找不到背景图 ${key}，将退回纯色背景。可用文件：${Object.keys(backgroundModules).join(', ') || '（无）'}`,
    );
    return undefined;
  }

  return module.default;
}
