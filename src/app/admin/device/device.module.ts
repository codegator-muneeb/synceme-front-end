import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousModule } from '../../pages/miscellaneous/miscellaneous.module';
import { AddUserComponent } from './add-user/add-user.component';
import { NbSelectModule } from '@nebular/theme';
import { EnableUserComponent } from './enable-user/enable-user.component';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DeviceStatusComponent } from './device-status/device-status.component';
import { UpdateWifiComponent } from './update-wifi/update-wifi.component';
import { DeviceListComponent } from './enable-user/deviceList.component';
import { UpdateUserComponent } from './update-user/update-user.component'

@NgModule({
  declarations: [DeviceComponent, AddUserComponent, EnableUserComponent, AddDeviceComponent, DeviceStatusComponent, UpdateWifiComponent, DeviceListComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    NbSelectModule,
    Ng2SmartTableModule
  ],
  providers: [SmartTableService],
  entryComponents: [DeviceListComponent]
})
export class DeviceModule { }
