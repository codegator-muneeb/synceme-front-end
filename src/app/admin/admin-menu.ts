import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Device Operations',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Add User',
        link: '/admin/device/user-add',
        home: true, 
      },
      {
        title: 'Modify User',
        link: '/admin/device/user-modify',
      },
      {
        title: 'Update User',
        link: '/admin/device/user-update',
      },
      {
        title: 'Device Options',
        link: '/admin/device/device-opts',
      },
      {
        title: 'Device Status',
        link: '/admin/device/device-stat',
      },
      {
        title: 'Update Wifi',
        link: '/admin/device/wifi-update',
      }
    ]
  },
  {
    title: 'Admin Operations',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Assign Manager',
        link: '/admin/backend/assign-manager',
        home: true, 
      },
    ]
  },
];