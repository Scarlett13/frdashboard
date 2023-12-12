import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Device',
      href: '/device',
      disabled: false,
    },
    {
      title: 'Staff',
      href: '/staff',
      disabled: false,
    },
    {
      title: 'Log',
      href: '/log',
      disabled: false,
    },
  ],
  mainNavAuth: [
    {
      title: 'Account',
      href: '/user',
    },
    {
      title: 'Identities',
      href: '/identities',
    },
    {
      title: 'Documentation',
      href: '/docs',
      disabled: true,
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      category: 'Navigation',
      catdesc: 'Navigate your page here',
      items: [
        {
          title: 'Dashboard',
          href: '/dashboard',
          icon: 'post',
          disabled: true,
        },
        {
          title: 'Visitor',
          href: '/visitor',
          icon: 'users',
        },
        {
          title: 'Guest',
          href: '/guest',
          icon: 'guest',
          disabled: true,
        },
        {
          title: 'Employee',
          href: '/employee',
          icon: 'employee',
          disabled: true,
        },
        {
          title: 'User management',
          href: '/user-management',
          icon: 'userCog',
          disabled: true,
        },
        {
          title: 'Device management',
          href: '/device-management',
          icon: 'settings',
          disabled: true,
        },
      ],
    },
  ],
  identitiesNav: [
    {
      category: 'Identities',
      catdesc: 'Manage your identities here',
      items: [
        {
          title: 'List identities',
          href: '/identities',
          icon: 'users',
        },
        {
          title: 'Identity request',
          href: '/identities/requests',
          icon: 'sharedfile',
          disabled: true,
        },
        {
          title: 'Request history',
          href: '/identities/requests/history',
          icon: 'privatepost',
          disabled: true,
        },
      ],
    },
  ],
  identitiesIdNav: [
    {
      category: 'Your identity',
      catdesc: 'Here is your identity info',
      items: [
        {
          title: 'Identity info',
          href: '/identities/[identitiesid]',
          icon: 'post',
        },
      ],
    },
  ],
  diariesNav: [
    {
      category: 'Diaries',
      catdesc: 'Manage your diaries here',
      items: [
        {
          title: 'List identities',
          href: '/identities',
          icon: 'post',
        },
        {
          title: 'Identity request',
          href: '/identities/requests',
          icon: 'sharedfile',
          disabled: true,
        },
        {
          title: 'Request history',
          href: '/identities/requests/history',
          icon: 'privatepost',
          disabled: true,
        },
      ],
    },
  ],
  userNav: [
    {
      category: 'Account',
      catdesc: 'Manage your account here',
      items: [
        {
          title: 'Your accounts',
          href: '/user',
          icon: 'user',
        },
        {
          title: 'Account relationships',
          href: '/user/relationships',
          icon: 'users',
          disabled: true,
        },
      ],
    },
  ],
};
