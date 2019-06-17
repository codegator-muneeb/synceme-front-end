import { Component } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { MonthCellComponent } from './month-cell/month-cell.component';
import { LeaveService } from '../../../../services/leave-service/leave.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-calendar',
  templateUrl: 'month-grid.component.html',
  styleUrls: ['month-grid.component.scss'],
  entryComponents: [MonthCellComponent],
})
export class MonthGridComponent {

  date = new Date();
  date2 = new Date();
  range: NbCalendarRange<Date>;
  dayCellComponent = MonthCellComponent;
  user: any;

  constructor(protected dateService: NbDateService<Date>,
    private leaveService: LeaveService,
    private authService: NbAuthService,
    private datePipe: DatePipe) {
    this.range = {
      start: this.monthStart,
      end: this.monthEnd,
    };

    // this.authService.onTokenChange()
    //   .subscribe((token: NbAuthJWTToken) => {
    //     if (token.isValid()) {
    //       this.user = token.getPayload();
    //     }
    //   });

    //   this.leaveService.getDayStatus(this.user.companyCode, this.user.empid,
    //     "20190419")
    //     .subscribe((response) => {
    //       console.log(response)
    //       MonthCellComponent.type = response.category
    //       MonthCellComponent.hours = response.hours
    //     },
    //     (error)=>console.log(error));
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }
}
