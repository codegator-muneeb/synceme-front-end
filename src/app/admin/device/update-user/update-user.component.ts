import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ScanHardwareService } from "../../../services/scan-hardware/scan-hardware.service"
import { UserService } from '../../../services/user-service/user.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrService, NbGlobalPhysicalPosition, NbGlobalPosition } from '@nebular/theme';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent{

  settings = {
    hideSubHeader: false,
    pager: {
      perPage: 6
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
      empId: {
        title: 'Employee ID',
        type: 'number',
        filter: true
      },
      firstName: {
        title: 'First Name',
        type: 'string',
        filter: true
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
        filter: true
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  selectedEmpID: string = "";
  selectedFirstName: string = "";
  selectedLastName: string = "";
  selectedDeviceList = [];
  newRfid: string = "";

  user: any;
  loading = false;

  constructor(private authService: NbAuthService, 
              private userService: UserService, 
              private scanService: ScanHardwareService,
              private toastrService: NbToastrService) { 
    
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });

    this.userService.getAllUsers(this.user.companyCode)
    .subscribe((response) => {
      const data = response
      this.source.load(data);
    }, 
    (error) => console.log(error));

  }

  onRowSelect(event){
    this.selectedEmpID = String(event.data.empId);
    this.selectedFirstName = String(event.data.firstName);
    this.selectedLastName = String(event.data.lastName);

    this.userService.getUserDeviceList(this.user.companyCode, this.selectedEmpID)
    .subscribe((response) => {
      //console.log(response.map(item => item.deviceId));
      this.selectedDeviceList = response.map(item => item.deviceId);
    }, 
    (error) => {
      this.showToast(NbToastStatus.WARNING, "Error", "Please try again");
      return;
    });
  }

  isEnabled(){
    return (this.selectedEmpID !== "" && this.newRfid !== "")
  }

  populateRfid(){
    this.loading = true;
    this.scanService.getId(this.user.companyCode).subscribe((response) => {
      this.checkAssign(response);
      this.loading = false;
    }, 
    (error) => {
      console.log(error)
      this.loading = false;
    });
  }

  checkAssign(response){
    if(typeof response !== "undefined"){
      this.newRfid = response.rfid
    } else{
      console.log("Current Value not received")
    }
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

  onUpdateClick(){

    console.log(this.selectedDeviceList);

    var deviceDetails = [{
      "empid": this.selectedEmpID,
      "rfid": this.newRfid
    }];

    this.scanService.updateUser(deviceDetails, this.selectedDeviceList)
    .subscribe((response) => {

        this.userService.updateUser(this.user.companyCode, this.selectedEmpID, this.newRfid)
        .subscribe((response) => {
          this.showToast(NbToastStatus.SUCCESS, "Success", "Operation Successful");
          this.reset();
        }, 
        (error) => {
          this.showToast(NbToastStatus.WARNING, "Error", "Please try again");
          return;
        });

    }, 
    (error) => {
      this.showToast(NbToastStatus.WARNING, "Error", "Please try again");
      return;
    });
  }

  reset(){
    this.selectedEmpID = "";
    this.selectedDeviceList = [];
    this.selectedFirstName = "";
    this.selectedLastName = "";
    this.newRfid = "";
  }
}