import { MainNavItem, SidebarNavItem } from '@/types/nav';

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Components',
      href: '/docs/components/accordion',
    },
    {
      title: 'Blocks',
      href: '/blocks',
    },
    {
      title: 'Charts',
      href: '/charts',
    },
    {
      title: 'Themes',
      href: '/themes',
    },
    {
      title: 'Examples',
      href: '/examples',
    },
    {
      title: 'Colors',
      href: '/colors',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
        {
          title: 'API Tokens',
          href: '/docs/api-token',
          items: [],
        },
        {
          title: 'Workspaces',
          href: '/docs/workspaces',
          items: [],
        },
      ],
    },
    {
      title: 'Modules',
      items: [
        {
          title: 'View Data',
          href: '/docs/modules/view',
          items: [],
        },
        {
          title: 'Visualize Data',
          href: '/docs/modules/visualize',
          items: [],
        },
        {
          title: 'Feature Engineering',
          href: '/docs/modules/feature-engineering',
          items: [],
        },
        {
          title: 'Train Data',
          href: '/docs/modules/train',
          items: [],
        },
        {
          title: 'Playground',
          href: '/docs/modules/playground',
          items: [],
        },
      ],
    },
  ]
};
