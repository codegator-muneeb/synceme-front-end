import { Component, HostBinding, OnDestroy } from '@angular/core';
import { MonthPickerCellComponent } from './month-picker-cell/month-picker-cell.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { LeaveService } from '../../../services/leave-service/leave.service';
import { DatePipe } from "@angular/common";
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'ngx-attendance-overview',
  templateUrl: './attendance-overview.component.html',
  styleUrls: ['./attendance-overview.component.scss'],
  entryComponents: [MonthPickerCellComponent]
})

//add implements OnDestroy
export class AttendanceOverviewComponent {
  /*
    default_month = 'March';
    default_year = 2019
    months = ['January','February','March','April','May','June','July','August','September','October','November','December','Yearly Review'];
    availableYears = [2015,2016,2017,2018,2019];
  
      @HostBinding('class.expanded')
      private expanded: boolean;
      private selected: number;
      month = new Date();
      monthCell = MonthPickerCellComponent;
  
  
      breakpoint: NbMediaBreakpoint;
      breakpoints: any;
      themeSubscription: any;
  */

  /*Make shift implementation*/

  asOfDate: any;
  loading = false;
  user: any;
  dailyReportFileName = "DailyReport_";

  source: LocalDataSource = new LocalDataSource();
  sourceAsData: any;

  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 10
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    columns: {
      category: {
        title: 'Category',
        type: 'number',
        filter: false
      },
      type: {
        title: 'Event',
        type: 'string',
        filter: false
      },
      hours: {
        title: 'Time',
        type: 'string',
        filter: false
      },
      device: {
        title: 'Gate',
        type: 'string',
        filter: false
      }
    }
  };

  /* Variables and functions for over a period report.
  */
  asOfRange: any;
  loadingFlagForOAP = false;
  overAPeriodFileName = "AttendanceReport_"

  sourceOAP: LocalDataSource = new LocalDataSource();
  sourceAsDataOAP: any;

  settingsOAP = {
    hideSubHeader: true,
    pager: {
      perPage: 10
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    columns: {
      startDate: {
        title: 'Start Date',
        type: 'number',
        filter: false
      },
      endDate: {
        title: 'End Date',
        type: 'number',
        filter: false
      },
      category: {
        title: 'Category',
        type: 'number',
        filter: false
      },
      type: {
        title: 'Event',
        type: 'string',
        filter: false
      },
      time: {
        title: 'Time',
        type: 'string',
        filter: false
      },
    }
  };
  /* Ends here
  */

  constructor(
    // private themeService: NbThemeService,
    //           private breakpointService: NbMediaBreakpointsService
    private authService: NbAuthService,
    private leaveService: LeaveService,
    private datePipe: DatePipe,
    private excelService: ExcelService
  ) {

    // this.breakpoints = this.breakpointService.getBreakpointsMap();
    // this.themeSubscription = this.themeService.onMediaQueryChange()
    //   .subscribe(([oldValue, newValue]) => {
    //     this.breakpoint = newValue;
    //   });

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

  }

  // expand() {
  //   this.expanded = true;
  // }

  // collapse() {
  //   this.expanded = false;
  // }

  // isCollapsed() {
  //   return !this.expanded;
  // }

  // ngOnDestroy() {
  //   this.themeSubscription.unsubscribe();
  // }

  load() {
    this.loading = true
    this.leaveService.getDayStatus(this.user.companyCode, this.user.empid, this.datePipe.transform(this.asOfDate, "yyyyMMdd"))
      .subscribe((response) => {
        var data;
        if (response.category === "Holiday") {
          data = [{
            category: response.category,
            type: response.type,
            hours: "Full Day",
            device: "-"
          }]
        } else if (response.category === "Leave") {
          data = [{
            category: response.category,
            type: response.type,
            hours: "Full Day",
            device: "-"
          }]
        } else {
          data = response.hours
        }
        this.loading = false
        this.source.load(data);
        this.sourceAsData = data;
      },
        (error) => {
          this.source = new LocalDataSource();
          this.loading = false;
          console.log(error)
        });
  }

  isEnabled() {
    return typeof this.asOfDate !== "undefined" && this.asOfDate !== "";
  }

  export() {
    var headers = ["Category", "Event", "Time", "Gate"]
    this.excelService.exportAsExcelFile(this.sourceAsData, headers, this.dailyReportFileName + this.user.empid,
      this.datePipe.transform(this.asOfDate, "yyyyMMdd"));
  }

  isExportEnabled() {
    return typeof this.sourceAsData !== "undefined";
  }

  loadOAP() {
    this.loadingFlagForOAP = true
    var startDate = this.datePipe.transform(this.asOfRange.start, "yyyyMMdd")
    var endDate = this.datePipe.transform(this.asOfRange.end, "yyyyMMdd")
    this.leaveService.getOverAPeriodStatus(this.user.companyCode, this.user.empid, startDate, endDate)
      .subscribe((response) => {
        this.loadingFlagForOAP = false
        this.sourceOAP.load(response);
        this.sourceAsDataOAP = response;
      },
        (error) => {
          this.sourceOAP = new LocalDataSource();
          this.loadingFlagForOAP = false;
          console.log(error)
        });
  }

  exportOAP(){
    var headers = ["Start Date", "End Date", "Category", "Event", " Time"]
    var startDate = this.datePipe.transform(this.asOfRange.start, "yyyyMMdd")
    var endDate = this.datePipe.transform(this.asOfRange.end, "yyyyMMdd")
    this.excelService.exportAsExcelFile(this.sourceAsDataOAP, headers, this.overAPeriodFileName + this.user.empid,
      startDate + "_" + endDate);
  }

  isEnabledOAP(){
    return typeof this.asOfRange !== "undefined" && this.asOfRange !== "";
  }

  isExportEnabledOAP(){
    return typeof this.sourceAsDataOAP !== "undefined";
  }
}
