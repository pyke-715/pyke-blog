import type { ImageMetadata } from 'astro';

/**
 * 首页背景图：从 src/assets/hero/ 里按文件名取，交给 Astro <Image> 做尺寸与格式优化。
 * 换图 = 把新图丢进 src/assets/hero/，再改 site.heroImage 的文件名。
 */
const heroModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/hero/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function getHeroImage(fileName?: string): ImageMetadata | undefined {
  const name = fileName?.trim();
  if (!name) return undefined;

  const key = `/src/assets/hero/${name}`;
  const module = heroModules[key];
  if (!module) {
    console.warn(
      `[hero] 找不到背景图 ${key}，首页将不显示背景。可用文件：${Object.keys(heroModules).join(', ') || '（无）'}`,
    );
    return undefined;
  }

  return module.default;
}
