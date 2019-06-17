import { Component, HostBinding, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { LeaveService } from '../../../services/leave-service/leave.service';
import { DatePipe } from "@angular/common";
import { UserService } from '../../../services/user-service/user.service';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'ngx-team-report',
  templateUrl: './team-report.component.html',
  styleUrls: ['./team-report.component.scss']
})
export class TeamReportComponent {

  asOfDate: any;
  loading = false;
  user: any;

  empUnderManager: any;
  selectedEmp;

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
      EmpId: {
        title: 'Employee ID',
        type: 'number',
        filter: false
      },
      Name: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      Total_Hours: {
        title: 'Total Hours Spent',
        type: 'string',
        filter: false
      }
    }
  };

  constructor(
    private authService: NbAuthService,
    private leaveService: LeaveService,
    private userService: UserService,
    private datePipe: DatePipe,
    private excelService: ExcelService
  ) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this.userService.getTeamUsers(this.user.companyCode, this.user.empid)
      .subscribe((response) => {
        this.empUnderManager = response
      });

  }

  load() {
    this.loading = true
    var empids = this.selectedEmp.map(item => item.empId);
    this.leaveService.getManagerReportData(this.user.companyCode, empids, this.datePipe.transform(this.asOfDate.start, "yyyyMMdd"),
      this.datePipe.transform(this.asOfDate.end, "yyyyMMdd"))
      .subscribe((response) => {
        this.loading = false
        this.source.load(response);
        this.sourceAsData = response
      },
        (error) => {
          this.source = new LocalDataSource();
          this.loading = false;
          console.log(error)
        });
  }

  isEnabled() {
    return typeof this.asOfDate !== "undefined" && typeof this.selectedEmp !== "undefined" && this.asOfDate !== "";
  }

  export() {
    var headers = ["Start Date", " End Date", "Total Hours"]
    var startDate = this.datePipe.transform(this.asOfDate.start, "yyyyMMdd")
    var endDate = this.datePipe.transform(this.asOfDate.end, "yyyyMMdd")
    this.excelService.exportAsExcelFile(this.sourceAsData, headers, "ComprehensiveManagerReport_" + this.user.empid,
      startDate + "_" + endDate);
  }

  isExportEnabled() {
    return typeof this.sourceAsData !== "undefined";
  }

}
