import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { DeviceService } from '../../../services/device-service/device.service';
import { ScanHardwareService } from '../../../services/scan-hardware/scan-hardware.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.scss']
})
export class DeviceStatusComponent implements OnInit{
  
  deviceList;
  user: any
  selectedDevice;
  fromSelectedDevice: any;
  toSelectedDevice: any;
  status = ""

  constructor(private authService: NbAuthService,
              private deviceService: DeviceService,
              private hardwareService: ScanHardwareService,
              private toastrService: NbToastrService)
  {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });
  }

  ngOnInit(){
    this.deviceService.getRegisteredDevices(this.user.companyCode)
    .subscribe((response) => {
      this.deviceList = response
    },
    (error) => console.log(error));

  }

  getStatus(){
    this.hardwareService.getDeviceStatus(this.selectedDevice.deviceId)
    .subscribe((response) => {
      this.status = this.prettifyStatus(JSON.parse(response))
      this.showToast(NbToastStatus.SUCCESS, "Success", "Status Reterived");
    },
    (error) => this.showToast(NbToastStatus.WARNING, "Error", "Error Occured"));
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

  isEnabled(){
    return typeof this.selectedDevice !== "undefined" && this.selectedDevice !== "";
  }

  prettifyStatus(response: JSON){
    var stringToRet = "";
    for(var prop in response){
      stringToRet += `${prop}: ${response[prop]}\n`; 
    }
    return stringToRet;
  }
}
