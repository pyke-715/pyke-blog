/**
 * 阅读量 provider 接口与本地占位实现。
 *
 * 页面只依赖这个接口；接真实服务（不蒜子 / 自建 KV / Artalk 计数）时，
 * 新增一个 provider 并在 src/config/views.ts 里换 id 即可，组件不用动。
 */

export interface ViewsProvider {
  id: string;
  /** 读取当前阅读量 */
  get(slug: string): Promise<number>;
  /** 记一次阅读并返回新值 */
  increment(slug: string): Promise<number>;
}

const STORAGE_PREFIX = 'views:';

/** 用 slug 生成稳定的初始值，避免所有人第一眼都是 0 */
function seed(slug: string): number {
  let hash = 0;
  for (const char of slug) {
    hash = (hash * 31 + char.codePointAt(0)!) % 100000;
  }
  return hash % 50;
}

function readLocal(slug: string): number | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + slug);
    if (raw === null) return null;
    const value = Number.parseInt(raw, 10);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function writeLocal(slug: string, value: number): void {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + slug, String(value));
  } catch {
    // 隐私模式下写入失败：本次会话内仍返回计算结果
  }
}

/** 本地占位：只存在当前浏览器，不产生任何网络请求 */
export const localViewsProvider: ViewsProvider = {
  id: 'local',
  async get(slug) {
    return readLocal(slug) ?? seed(slug);
  },
  async increment(slug) {
    const next = (readLocal(slug) ?? seed(slug)) + 1;
    writeLocal(slug, next);
    return next;
  },
};

export const viewsProviders: Record<string, ViewsProvider> = {
  local: localViewsProvider,
};

export function resolveViewsProvider(id: string): ViewsProvider {
  return viewsProviders[id] ?? localViewsProvider;
}
