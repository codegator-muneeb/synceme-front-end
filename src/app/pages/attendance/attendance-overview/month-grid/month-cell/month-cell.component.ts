import { Component, OnInit, AfterViewInit, AfterViewChecked, OnChanges } from '@angular/core';
import { NbCalendarDayCellComponent, NbDateService } from '@nebular/theme';
// import { LeaveService } from '../../../../../services/leave-service/leave.service';
// import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
// import { DatePipe } from "@angular/common"

@Component({
  selector: 'ngx-month-cell',
  templateUrl: 'month-cell.component.html',
  styleUrls: ['month-cell.component.scss'],
  host: { '(click)': 'onClick()', 'class': 'day-cell' },
})
export class MonthCellComponent extends NbCalendarDayCellComponent<Date>{

  // constructor(public dateService: NbDateService<Date>,
  //   private leaveService: LeaveService,
  //   private authService: NbAuthService,
  //   private datePipe: DatePipe) {

  //   super(dateService);

  // }
  
  // // ngOnInit(){
  // //   this.leaveService.getDayStatus(this.user.companyCode, this.user.empid,
  // //     this.datePipe.transform(this.date, 'yyyyMMdd'))
  // //     .subscribe((response) => {
  // //       console.log(response)
  // //       this.type = response.category
  // //       this.hours = response.hours
  // //       console.log(this.type)
  // //     },
  // //     (error)=>console.log(error));
  // // }
}
