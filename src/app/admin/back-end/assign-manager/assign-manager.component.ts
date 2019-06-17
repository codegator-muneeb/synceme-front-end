import { Component, ViewChild } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../services/user-service/user.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-assign-manager',
  templateUrl: './assign-manager.component.html',
  styleUrls: ['./assign-manager.component.scss']
})
export class AssignManagerComponent {

  @ViewChild("managerList") mangerList: any;
  @ViewChild("empList") empList: any;

  selectedManager: any;
  selectedEmp: any;
  user: any;

  listOfManagers = [];
  listOfEmp = [];
  listOfEmpCopy = [];

  constructor(private authService: NbAuthService,
    private userService: UserService,
    private toastrService: NbToastrService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this.userService.getAllUsers(this.user.companyCode)
      .subscribe(response => {
        this.listOfManagers = response;
        this.listOfEmp = response;
        this.listOfEmpCopy = response;
      })
  }

  enabled() {
    return typeof this.selectedManager !== "undefined"
      && typeof this.selectedEmp !== "undefined"
      && this.selectedEmp.length !== 0;
  }

  assign() {
    var empids = this.selectedEmp.map(item => item.empId);
    this.userService.assignManager(this.user.companyCode, this.selectedManager.empId, empids)
      .subscribe(response => {
        this.showToast(NbToastStatus.SUCCESS, 'Sucess', 'Operation Done Successfully');
        this.reset();
      },
        err => {
          this.showToast(NbToastStatus.WARNING, 'Failure', 'Operation Failed! Try again!');
          this.reset();
        })
  }

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? title : '';

    this.toastrService.show(
      body,
      titleContent,
      config);
  }

  reset() {
    this.mangerList.reset();
    this.selectedEmp = [];
  }

  disableOption() {
    var opList = this.empList.options._results;
    opList.map(item => item.value.empId !== this.selectedManager.empId
      ? item.disabled = false
      : item.disabled = true);
  }

}
