import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: '简单易用的 h5 播放器，UI 高度定制化、功能丰富',

  themeConfig: {
    nav: [
      {
        text: '指南',
        link: '/zh/guide/getting-started',
        activeMatch: '/zh/guide/'
      },
      {
        text: 'API',
        link: '/zh/api/parameters',
        activeMatch: '/zh/api/'
      },
    ],
    sidebar: {
      '/zh/guide/': { base: '/zh/guide/', items: sidebarGuide() },
      '/zh/api/': { base: '/zh/api/', items: sidebarAPI() },
    },
    editLink: {
      pattern: 'https://github.com/vortesnail/qier-player/edit/master/website/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2019-2024 Vortesnail'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面导航'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'QierPlayer 是什么？', link: 'what-is-qier-player' },
    { text: '安装', link: 'installation' },
    { text: '快速开始', link: 'getting-started' },
    { text: '快捷键', link: 'shortcut' },
    { text: '右键菜单', link: 'menu' },
    { text: '控制器', link: 'controller' },
    { text: '设置菜单', link: 'setting-menu' },
    { text: '视频缩略图', link: 'thumbnail' },
    {
      text: '例子',
      collapsed: false,
      items: [
        { text: '视频截图', link: 'examples/video-screenshot' },
        { text: '画质切换', link: 'examples/quality-switch' },
        { text: '镜像画面', link: 'examples/mirroring' },
        // { text: '自定义主题', link: 'examples/custom-theme' },
      ]
    },
  ]
}

function sidebarAPI(): DefaultTheme.SidebarItem[] {
  return [
    { text: '参数', link: 'parameters' },
    { text: '属性', link: 'properties' },
    { text: '方法', link: 'functions' },
    { text: '事件', link: 'events' },
  ]
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  zh: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}
