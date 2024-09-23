import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'A simple and easy-to-use h5 player with highly customized UI and rich functions',

  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide/getting-started',
        activeMatch: '/guide/'
      },
      {
        text: 'API',
        link: '/api/parameters',
        activeMatch: '/api/'
      },
    ],
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/api/': { base: '/api/', items: sidebarAPI() },
    },
    editLink: {
      pattern: 'https://github.com/vortesnail/qier-player/edit/master/website/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Vortesnail'
    }
  }
})

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'What is QierPlayer', link: 'what-is-qier-player' },
    { text: 'Installation', link: 'installation' },
    { text: 'Getting Started', link: 'getting-started' },
    { text: 'Shortcuts', link: 'shortcut' },
    { text: 'Context Menu', link: 'menu' },
    { text: 'Controller', link: 'controller' },
    { text: 'Setting Menu', link: 'setting-menu' },
    { text: 'Video Thumbnail', link: 'thumbnail' },
    {
      text: 'Examples',
      collapsed: false,
      items: [
        { text: 'Video Thumbnail', link: 'examples/video-screenshot' },
        { text: 'Quantity Switch', link: 'examples/quality-switch' },
        { text: 'Mirroring', link: 'examples/mirroring' },
        // { text: 'Custom Theme', link: 'examples/custom-theme' },
      ]
    },
  ]
}

function sidebarAPI(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Parameters', link: 'parameters' },
    { text: 'Properties', link: 'properties' },
    { text: 'Methods', link: 'functions' },
    { text: 'Events', link: 'events' },
  ]
}
