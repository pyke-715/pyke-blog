/**
 * 主题注册表：唯一数据源。
 *
 * 加一个自定义主题 = 在 themes 数组里加一项（7 个 token 必须写全，缺了 tsc 会报错）。
 * 主题 id 会写进 <html data-theme="...">，建议保持小写英文。
 */

export const TOKEN_KEYS = [
  '--color-bg',
  '--color-bg-subtle',
  '--color-fg',
  '--color-fg-muted',
  '--color-border',
  '--color-accent',
  '--color-accent-fg',
] as const;

export type TokenKey = (typeof TOKEN_KEYS)[number];

export type ThemeColorScheme = 'light' | 'dark';

export interface Theme {
  id: string;
  label: string;
  colorScheme: ThemeColorScheme;
  tokens: Record<TokenKey, string>;
}

/** 首次访问时的主题，也是"跟随系统"解析前的兜底 */
export const DEFAULT_THEME_ID = 'light';

/** 三态循环里的第三个状态，不是 theme id */
export const SYSTEM_PREFERENCE = 'system';

/** localStorage 键名，存的是偏好（light/dark/system/自定义 id），不是解析结果 */
export const STORAGE_KEY = 'theme-preference';

export const themes: Theme[] = [
  {
    id: 'light',
    label: '亮色',
    colorScheme: 'light',
    tokens: {
      '--color-bg': '#ffffff',
      '--color-bg-subtle': '#f5f5f5',
      '--color-fg': '#1a1a1a',
      '--color-fg-muted': '#5c5c5c',
      '--color-border': '#e0e0e0',
      '--color-accent': '#0b6bcb',
      '--color-accent-fg': '#ffffff',
    },
  },
  {
    id: 'dark',
    label: '暗色',
    colorScheme: 'dark',
    tokens: {
      '--color-bg': '#111111',
      '--color-bg-subtle': '#1c1c1c',
      '--color-fg': '#ededed',
      '--color-fg-muted': '#a0a0a0',
      '--color-border': '#2e2e2e',
      '--color-accent': '#5aa9ff',
      '--color-accent-fg': '#0b0b0b',
    },
  },
];

/** 跟随系统时解析到的具体主题 id */
export const LIGHT_THEME_ID = themes.find((t) => t.colorScheme === 'light')?.id ?? 'light';
export const DARK_THEME_ID = themes.find((t) => t.colorScheme === 'dark')?.id ?? 'dark';

export function getTheme(id: string): Theme | undefined {
  return themes.find((theme) => theme.id === id);
}
