import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    name: 'Inbounds',
    url: '/inbounds',
    icon: 'cil-chevron-right'
  },
  {
    name: 'Outbounds',
    url: '/outbounds',
    icon: 'cil-chevron-left',

  },
  {
    name: 'Inventory',
    url: '/inventory',
    icon: 'cil-bar-chart',
  },
  {
    name: 'Orders',
    url: '/orders',
    icon: 'cil-3d',
  },
  {
    name: 'Returns',
    url: '/returns',
    icon: 'cil-history'
  },
  {
    name: 'Errors',
    url: '/errors',
    icon: 'cil-warning',
      badge: {
      variant: 'danger',
      text: ' ! ',
    },
  },
  {
    name: 'Invoices',
    url: '/invoice',
    icon: 'cil-folder-open',
    
  },
  {
    name: 'Apps',
    url: '/apps',
    icon: 'cil-layers',
  },
];
