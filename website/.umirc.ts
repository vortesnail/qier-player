import { defineConfig } from 'dumi';
import path from 'path';

const prefix = '/qier-player';

export default defineConfig({
  title: 'Qier Player',
  mode: 'site',
  logo: prefix + '/img/logo.svg',
  favicon: prefix + '/img/favicon.ico',
  base: prefix,
  publicPath: prefix + '/',
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
  theme: {
    '@c-primary': '#0073a1',
    '@c-primary-dark': '#0095c7',
  },
  styles: [
    `.__dumi-default-dark-auto { display: none !important }`,
    `code {
      background: #f6f7f9;
      color: #454d64 !important;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      padding-top: 1px !important;
      padding-bottom: 1px !important;
 }`,
    `[data-prefers-color=dark] .markdown *:not(pre) code {
      border-color: #434343;
      color: #ff7875 !important;
    }`,
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
      src: 'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
      changeOrigin: true,
    },
    {
      src: 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
      changeOrigin: true,
    },
  ],
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
});
