import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceComponent } from './attendance.component';
import { InformationComponent } from './information/information.component';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { TeamLeaveRequestsComponent } from './apply-leave/team-leave-requests/team-leave-requests.component';
import { AttendanceOverviewComponent } from './attendance-overview/attendance-overview.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { TeamReportComponent } from './team-report/team-report.component';

const routes: Routes = [{
  path: '',
  component: AttendanceComponent,
  children: [{
    path: 'apply-leave',
    component: ApplyLeaveComponent,
  }, {
    path: 'attendance-overview',
    component: AttendanceOverviewComponent,
  }, {
    path: 'info',
    component: InformationComponent,
  }, {
    path: 'daily-report',
    component: NotFoundComponent, //DailyReportComponent,
  }, {
    path: 'team-requests',
    component: TeamLeaveRequestsComponent,
  }, {
    path: 'team-report',
    component: TeamReportComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule { }