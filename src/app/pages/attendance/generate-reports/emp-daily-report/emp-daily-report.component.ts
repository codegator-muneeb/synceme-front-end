import { Component } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { LeaveService } from '../../../../services/leave-service/leave.service';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../../services/excel.service';

@Component({
  selector: 'ngx-emp-daily-report',
  templateUrl: './emp-daily-report.component.html',
  styleUrls: ['./emp-daily-report.component.scss']
})
export class EmpDailyReportComponent {

  asOfDate: any;
  spinnerFlag = false;
  user: any;
  loading = false;
  dailyReportFileName = "DailyReport_";

  constructor(private authService: NbAuthService,
    private leaveService: LeaveService,
    private datePipe: DatePipe,
    private excelService: ExcelService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

  }

  generate() {
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
        var headers = [];
        this.loading = false
        this.excelService.exportAsExcelFile(data, headers, this.dailyReportFileName + this.user.empid,
          this.datePipe.transform(this.asOfDate, "yyyyMMdd"));
        this.reset();
      },
        (error) => {
          this.loading = false;
          console.log(error)
        });
  }

  isEnabled() {
    return typeof this.asOfDate !== "undefined" && this.asOfDate !== ""
  }

  reset() {
    this.asOfDate = "";
  }
}
