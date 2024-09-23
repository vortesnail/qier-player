import { defineConfig } from 'vitepress';
import { search as zhSearch } from './zh';

export const shared = defineConfig({
  title: 'QierPlayer',

  rewrites: {
    'en/:rest*': ':rest*',
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vortesnail/qier-player' }],
    search: {
      provider: 'local',
      options: {
        locales: {
          ...zhSearch,
        },
      },
    },
  },
});
