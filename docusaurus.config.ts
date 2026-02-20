import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mira POS Docs',
  tagline: 'Platform documentation for FundMore',
  favicon: 'img/fundmoreai.png',

  future: {
    v4: true,
  },

  // GitHub Pages deployment
  url: 'https://miralabsai.github.io',
  baseUrl: '/fundmore-platform-docs/',

  // GitHub pages deployment config
  organizationName: 'miralabsai',
  projectName: 'fundmore-platform-docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Mermaid support for diagrams
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Docs at root — introduction.md becomes the homepage
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Mira POS Docs | FundMore.ai',
      logo: {
        alt: 'Mira by FundMore',
        src: 'img/mira-logo.svg',
        srcDark: 'img/mira-logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'clientSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'html',
          position: 'right',
          value: '<a href="/"><img src="/fundmore-platform-docs/img/fundmoreai2.png" alt="FundMore.ai" style="height: 28px; margin-top: 4px;" /></a>',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Platform Overview',
              to: '/',
            },
            {
              label: 'Authentication',
              to: '/authentication',
            },
            {
              label: 'Borrower Portal',
              to: '/b2c-borrower-portal',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'AI Platform',
              to: '/ai-platform',
            },
            {
              label: 'Notifications',
              to: '/notifications',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MiraLabs Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'python', 'typescript', 'yaml', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
