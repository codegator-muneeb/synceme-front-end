import { Component } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { DeviceService } from '../../../services/device-service/device.service';
import { ScanHardwareService } from '../../../services/scan-hardware/scan-hardware.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-update-wifi',
  templateUrl: './update-wifi.component.html',
  styleUrls: ['./update-wifi.component.scss']
})

export class UpdateWifiComponent {
  devices: any;
  ssid = "";
  password = "";
  user: any;
  selectedDevices: any;

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
        this.devices = response
        console.log(this.devices);
      },
        (error) => console.log(error));

  }

  update() {
    if (confirm("Are you sure, you want to update the wifi?")) {
      this.hardwareService.updateWifi(this.ssid, this.password, this.selectedDevices.map(device => device.deviceId))
        .subscribe((response) => {
          this.showToast(NbToastStatus.SUCCESS, "Success", "Wifi Updated Successfully");
        },
          (error) => this.showToast(NbToastStatus.WARNING, "Error", "Error Occured"));
    }
  }

  isEnabled() {
    return this.ssid !== "" && this.password !== "" && typeof this.selectedDevices !== "undefined";
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
}
