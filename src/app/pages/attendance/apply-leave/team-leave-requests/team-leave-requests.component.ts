import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { LeaveService } from '../../../../services/leave-service/leave.service';
import { Router } from '@angular/router';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrService, NbGlobalPhysicalPosition, NbGlobalPosition } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-team-leave-requests',
  templateUrl: './team-leave-requests.component.html',
  styleUrls: ['./team-leave-requests.component.scss']
})
export class TeamLeaveRequestsComponent {

  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 6
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      id: {
        title: 'Leave ID',
        type: 'string',
      },
      empid: {
        title: 'Employee ID',
        type: 'string',
      },
      fullname: {
        title: 'Name',
        type: 'string',
      },
      type: {
        title: 'Type of Leave',
        type: 'string',
      },
      typeId: {
        title: 'Type ID',
        type: 'string',
      },
      from: {
        title: 'From',
        type: 'string',
      },
      to: {
        title: 'To',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      days: {
        title: 'Days Used',
        type: 'string',
      }

    },
  };

  sourcePending: LocalDataSource = new LocalDataSource();
  sourceAccepted: LocalDataSource = new LocalDataSource();
  sourceRejected: LocalDataSource = new LocalDataSource();
  user: any;
  selectedId = -1;
  selectedEmpId = "";
  selectedTypeId = -1;

  config: ToasterConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;
  status: NbToastStatus = NbToastStatus.SUCCESS;

  constructor(private authService: NbAuthService,
              private leaveService: LeaveService,
              private router: Router,
              private toastrService: NbToastrService) {
                
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });

    this.leaveService.getTeamLeaveRequests(this.user.companyCode, this.user.empid , 0)
    .subscribe((response) => {
      const data = response
      this.sourcePending.load(data);
    }, 
    (error) => console.log(error));

    this.leaveService.getTeamLeaveRequests(this.user.companyCode, this.user.empid , 1)
    .subscribe((response) => {
      const data = response
      this.sourceAccepted.load(data);
    }, 
    (error) => console.log(error));

    this.leaveService.getTeamLeaveRequests(this.user.companyCode, this.user.empid , -1)
    .subscribe((response) => {
      const data = response
      this.sourceRejected.load(data);
    }, 
    (error) => console.log(error));
  }

  onRowSelect(event){
    this.selectedId = Number(event.data.id);
    this.selectedEmpId = String(event.data.empid);
    this.selectedTypeId = Number(event.data.typeId);
  }

  isEnabled(){
    return this.selectedId !== -1 && this.selectedEmpId !== "" && this.selectedTypeId !== -1;
  }

  approve(){
    this.leaveService.approveRequest(this.user.companyCode, this.selectedEmpId, this.selectedId, this.selectedTypeId)
    .subscribe((response) => {
      this.showToast(NbToastStatus.SUCCESS, "Successful", "Approved Request");
      
      setTimeout(() => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                  this.router.navigate(["/pages/attendance/team-report"]));  
      }, 2000); 
    }, 
    (error) => this.showToast(NbToastStatus.WARNING, "Error", "Failed!"));
  }

  reject(){
    this.leaveService.rejectRequest(this.user.companyCode, this.selectedEmpId, this.selectedId, this.selectedTypeId)
    .subscribe((response) => {

      this.showToast(NbToastStatus.SUCCESS, "Successful", "Rejected Request");

      setTimeout(() => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                  this.router.navigate(["/pages/attendance/team-report"]));  
      }, 2000);
    }, 
    (error) => this.showToast(NbToastStatus.WARNING, "Error", "Failed!"));
  }

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? title : '';

    this.toastrService.show(
      body,
      titleContent,
      config);
  }

}
