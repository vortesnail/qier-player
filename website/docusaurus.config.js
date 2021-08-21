const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Qier Player',
  tagline: 'A simple and easy-to-use h5 video player with highly customizable UI and rich features.',
  url: 'https://vortesnail.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'vortesnail',
  projectName: 'qier-player',
  themeConfig: {
    navbar: {
      title: 'Qier Player',
      logo: {
        alt: 'Qier Player Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'right',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'right' },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/vortesnail/qier-player/issues/',
          label: 'Feedback',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/qier-player',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/vortesnail/qier-player',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Qier Player, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/vortesnail/qier-player/master/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/vortesnail/qier-player/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
