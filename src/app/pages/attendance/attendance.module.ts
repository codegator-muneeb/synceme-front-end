import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { AttendanceComponent } from './attendance.component';
import { InformationComponent } from './information/information.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ProgressBarComponent } from './apply-leave/progress-bar/progress-bar.component';
import { DisplayComponent } from './apply-leave/display/display.component';
import { ReviewComponent } from './apply-leave/review/review.component';
import { FinishComponent } from './apply-leave/finish/finish.component';
import { AttendanceOverviewComponent } from './attendance-overview/attendance-overview.component';
import { MonthGridComponent } from './attendance-overview/month-grid/month-grid.component';
import { SummaryChartComponent } from './attendance-overview/summary-chart/summary-chart.component';
import { MonthCellComponent } from './attendance-overview/month-grid/month-cell/month-cell.component';
import { LegendComponent } from './attendance-overview/legend/legend.component';
import { ApproverDialogComponent } from './apply-leave/display/approver-dialog/approver-dialog.component';
import { TableComponent } from './apply-leave/display/approver-dialog/table/table.component';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MonthPickerCellComponent } from './attendance-overview/month-picker-cell/month-picker-cell.component';
import { LeaveStatusComponent } from './apply-leave/leave-status/leave-status.component';
import { TeamLeaveRequestsComponent } from './apply-leave/team-leave-requests/team-leave-requests.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { TeamReportComponent } from './team-report/team-report.component';
import { EmpDailyReportComponent } from './generate-reports/emp-daily-report/emp-daily-report.component';

const components = [
  AttendanceComponent,
  InformationComponent,
  ApplyLeaveComponent,
];

@NgModule({
  imports: [
    NgbModalModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ThemeModule,
    AttendanceRoutingModule,
    MiscellaneousModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    ...components,
    ProgressBarComponent,
    DisplayComponent,
    ReviewComponent,
    FinishComponent,
    AttendanceOverviewComponent,
    MonthGridComponent,
    SummaryChartComponent,
    MonthCellComponent,
    LegendComponent,
    ApproverDialogComponent,
    TableComponent,
    MonthPickerCellComponent,
    LeaveStatusComponent,
    TeamLeaveRequestsComponent,
    DailyReportComponent,
    TeamReportComponent,
    EmpDailyReportComponent,  
  ],
  entryComponents: [
    ApproverDialogComponent
  ],
  providers: [
    SmartTableService
  ]
})
export class AttendanceModule { }
