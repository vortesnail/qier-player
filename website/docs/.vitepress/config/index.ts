import { defineConfig } from 'vitepress';
import { shared } from './shared';
import { en } from './en';
import { zh } from './zh';

export default defineConfig({
  ...shared,
  base: '/qier-player/',
  head: [['link', { rel: 'icon', href: '/qier-player/favicon.ico' }]],
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh },
  },
  vite: {
    ssr: {
      noExternal: ['qier-player', '@qier-player/danmaku'],
    },
  }
});
