import { isBrowser } from '@Src/main/utils/env';

const data: Record<string, Record<string, string>> = Object.create(null);

export const I18n = {
  currentLang: '',
  defaultLang: '',
  trans(key: string, lang?: string): string {
    return data[lang || this.currentLang || this.defaultLang]?.[key] || key;
  },
  add(lang: string, transData: Record<string, string>): void {
    data[lang.toLowerCase()] = { ...data[lang.toLowerCase()], ...transData };
  },
  setCurrentLang(lang?: string): void {
    this.currentLang =
      lang || navigator.language || (navigator as any).browserLanguage || (navigator as any).userLanguage;
    if (this.currentLang) this.currentLang = this.currentLang.toLowerCase();
  },
  setDefaultLang(lang?: string): void {
    this.defaultLang = (lang || '').toLowerCase();
  },
};

export const PLAY = 'Play';
export const PAUSE = 'Pause';

I18n.add('zh-cn', {
  [PLAY]: '播放',
  [PAUSE]: '暂停',
});
if (isBrowser) I18n.setCurrentLang();
