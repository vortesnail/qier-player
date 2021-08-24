import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'Qier Player',
  mode: 'site',
  logo: '/img/logo.svg',
  favicon: '/img/favicon.ico',
  metas: [
    {
      name: 'keywords',
      content: 'qier-player, player, h5 player, react, vue',
    },
    {
      name: 'description',
      content:
        'A simple and easy-to-use h5 video player with highly customizable UI and rich features.',
    },
  ],
  navs: {
    'en-US': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/vortesnail/qier-player',
      },
    ],
    'zh-CN': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/vortesnail/qier-player',
      },
    ],
  },
  alias: {
    '@Comp': path.resolve(__dirname, './components'),
  },
  scripts: [
    {
      src: 'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
      changeOrigin: true,
    },
    {
      src: 'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
      changeOrigin: true,
    },
  ],
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
});
