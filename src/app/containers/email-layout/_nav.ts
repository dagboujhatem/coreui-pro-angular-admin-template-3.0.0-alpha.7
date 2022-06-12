import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Compose',
    url: '/apps/email/compose',
    icon: 'cil-pen',
    variant: 'success',
  },
  {
    name: 'Inbox',
    url: '/apps/email/inbox',
    icon: 'cil-inbox',
    badge: {
      variant: 'danger',
      text: '4',
    },
  },
  {
    name: 'Stared',
    url: '/apps/email/stared',
    icon: 'cil-star',
  },
  {
    name: 'Sent',
    url: '/apps/email/sent',
    icon: 'cil-paper-plane',
  },
  {
    name: 'Trash',
    url: '/apps/email/trash',
    icon: 'cil-trash',
  },
  {
    name: 'Important',
    url: '/apps/email/important',
    icon: 'cil-bookmark',
    badge: {
      variant: 'info',
      text: '5',
    },
  },
  {
    name: 'Spam',
    url: '/apps/email/spam',
    icon: 'cil-report-slash',
    badge: {
      variant: 'warning',
      text: '5',
    },
  },
  {
    divider: true,
    class: 'mt-auto',
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
];
