import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../services/user-service/user.service';
import { DeviceService } from '../../../services/device-service/device.service';
import { ScanHardwareService } from '../../../services/scan-hardware/scan-hardware.service';
import { async } from 'q';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-enable-user',
  templateUrl: './enable-user.component.html',
  styleUrls: ['./enable-user.component.scss']
})
export class EnableUserComponent {

  settings = {
    selectMode: 'multi',
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
    },
  };

  source: LocalDataSource = new LocalDataSource();
  user: any;

  selectedRows: { empid: string, devices: any[], selectedDevices: any[] }[] = [];

  constructor(private authService: NbAuthService,
    private userService: UserService,
    private hardwareService: ScanHardwareService,
    private toastService: NbToastrService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    var data;

    this.userService.getAllUsers(this.user.companyCode)
      .subscribe((response) => {
        data = response;
        this.source.load(data);
      },
        (error) => console.log("Couldn't Load Data"));

  }

  onRowSelect(event) {
    var empid = String(event.data.empId);
    var index = this.selectedRows.findIndex(row => row.empid === empid);
    var rowtoInsert = {
      empid: empid,
      devices: [],
      selectedDevices: []
    }
    if (index === -1) {
      this.selectedRows.push(rowtoInsert);
    } else {
      this.selectedRows.splice(index, 1);
    }
  }

  async createDeviceFields() {

    this.asyncForEach(this.selectedRows, async (row) => {
      var serviceCall = await this.userService.getUserDeviceList(this.user.companyCode, row.empid)
      serviceCall.subscribe((response) => {
        row.devices = response
      },
        (error) => console.log("Couldn't get device list for:" + row.empid))
    })

  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async onDeleteClick() {
    var dictionary = this.makeUserDevicePairings();
    await this.asyncForEach(dictionary, async (device) => {
      var serviceCall = await this.hardwareService.deleteUser(device.empids, [device.deviceId])
      serviceCall.subscribe((response) => {
        this.userService.deleteUsers(this.user.companyCode, device.empids.map(temp => temp.empid))
          .subscribe((response) => {
            this.showToast(NbToastStatus.SUCCESS, "Success", "Operation successful")
          },
            (error) => this.showToast(NbToastStatus.WARNING, "Error", "Operation failed"))
      },
        (error) => this.showToast(NbToastStatus.WARNING, "Error", "Operation failed"))
    })
  }

  async onEnableClick() {
    var dictionary = this.makeUserDevicePairings();
    await this.asyncForEach(dictionary, async (device) => {
      var serviceCall = await this.hardwareService.enableUser(device.empids, [device.deviceId], true)
      serviceCall.subscribe((response) => {
        this.showToast(NbToastStatus.SUCCESS, "Success", "Operation successful")
      },
        (error) => this.showToast(NbToastStatus.WARNING, "Error", "Operation failed"))
    })
  }

  async onDisableClick() {
    var dictionary = this.makeUserDevicePairings();
    await this.asyncForEach(dictionary, async (device) => {
      var serviceCall = await this.hardwareService.enableUser(device.empids, [device.deviceId], false)
      serviceCall.subscribe((response) => {
        this.showToast(NbToastStatus.SUCCESS, "Success", "Operation successful")
      },
        (error) => this.showToast(NbToastStatus.WARNING, "Error", "Operation failed"))
    })
  }

  makeUserDevicePairings() {
    var dictionary: {
      deviceId: string,
      empids: any[]
    }[] = [];

    for (var row of this.selectedRows) {
      for (var device of row.selectedDevices) {
        var index = dictionary.findIndex(element => element.deviceId === device.deviceId)
        if (index === -1) {
          var temp = {
            deviceId: device.deviceId,
            empids: [{ empid: row.empid }]
          }
          dictionary.push(temp);
        } else {
          dictionary[index].empids.push({ empid: row.empid })
        }
      }
    }
    return dictionary;
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

    this.toastService.show(
      body,
      titleContent,
      config);
  }
}