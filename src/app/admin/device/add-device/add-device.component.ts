import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { DeviceService } from '../../../services/device-service/device.service';
import { ScanHardwareService } from '../../../services/scan-hardware/scan-hardware.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  deviceTypes = ["Fingerprint", "RFID", "Both"];
  regDeviceList: any
  unregDeviceList: any;
  user: any;
  selectedDeviceForEDR: any;
  deviceToRegister: any;
  deviceAddId = "";
  deviceAddName = "";

  constructor(private authService: NbAuthService,
    private deviceService: DeviceService,
    private hardwareService: ScanHardwareService,
    private toastrService: NbToastrService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
  }

  ngOnInit() {
    this.deviceService.getRegisteredDevices(this.user.companyCode)
      .subscribe((response) => {
        this.regDeviceList = response
      },
        (error) => console.log(error));

    this.deviceService.getUnregisteredDevices(this.user.companyCode)
      .subscribe((response) => {
        this.unregDeviceList = response
      },
        (error) => console.log(error));

  }

  register() {
    this.hardwareService.registerDevice(this.deviceToRegister.deviceId, this.deviceToRegister.name)
      .subscribe((response) => {

        this.deviceService.registerDevice(this.deviceToRegister.deviceId)
          .subscribe((response) => {
            this.showToast(NbToastStatus.SUCCESS, "Success", "Registered Sucessful")
          },
            (error) => this.showToast(NbToastStatus.WARNING, "Error", "Unsuccessful!"));

      },
        (error) => this.showToast(NbToastStatus.WARNING, "Error", "Unsuccessful!"));
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

  enable(flag: boolean) {
    this.hardwareService.enableDevice(this.selectedDeviceForEDR.deviceId, flag)
      .subscribe((response) => {
        this.showToast(NbToastStatus.SUCCESS, "Success", "Operation Sucessful")
      },
        (error) => this.showToast(NbToastStatus.WARNING, "Error", "Unsuccessful!"));
  }

  reset() {
    if(confirm("Are you sure, you want to reset?")){
    this.hardwareService.resetDevice(this.selectedDeviceForEDR.deviceId)
      .subscribe((response) => {
        this.deviceService.deleteDevice(this.selectedDeviceForEDR.deviceId, this.user.companyCode)
          .subscribe((response) => {
            this.showToast(NbToastStatus.SUCCESS, "Success", "Operation Sucessful")
          },
            (error) => this.showToast(NbToastStatus.WARNING, "Error", "Unsuccessful!"))
      },
        (error) => this.showToast(NbToastStatus.WARNING, "Error", "Unsuccessful!"));
    }
  }

  addDevice() {
    var type = Number(this.deviceAddId.split('-')[1]);

    this.deviceService.addDevice(this.user.companyCode, this.deviceAddId, this.deviceAddName, type)
      .subscribe((response) => {
        this.showToast(NbToastStatus.SUCCESS, "Success", "Operation Sucessful")
      },
        (error) => this.showToast(NbToastStatus.WARNING, "Error", "Unsuccessful!"));
  }

  enableSubmit() {
    return this.deviceAddId !== "" && this.deviceAddName !== "";
  }

  enableRegsiter() {
    return typeof this.deviceToRegister !== "undefined";
  }

  enableEDR() {
    return typeof this.selectedDeviceForEDR !== "undefined";
  }
}
