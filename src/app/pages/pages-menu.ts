import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Attendance',
    icon: 'nb-bar-chart',
    children: [
      // {
      //   title: 'Information',
      //   link: '/pages/attendance/info',
      //   home: true 
      // },
      // {
      //   title: 'Apply for Leave',
      //   link: '/pages/attendance/apply-leave',
      // },
      {
        title: 'Attendance Overview',
        link: '/pages/attendance/attendance-overview',
        home: true
      },
      // {
      //   title: 'Daily Report',
      //   link: '/pages/attendance/daily-report',
      // },
      // {
      //   title: 'Team Leave Requests',
      //   link: '/pages/attendance/team-requests',
      // },
      {
        title: 'Team Attendance Report',
        link: '/pages/attendance/team-report',
      }
    ]
  },
];
