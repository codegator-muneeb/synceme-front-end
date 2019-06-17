import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device.component';
import { NotFoundComponent } from '../../pages/miscellaneous/not-found/not-found.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EnableUserComponent } from './enable-user/enable-user.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DeviceStatusComponent } from './device-status/device-status.component';
import { UpdateWifiComponent } from './update-wifi/update-wifi.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [{
  path: '',
  component: DeviceComponent,
  children: [{
    path: 'user-add',
    component: AddUserComponent,
  }, {
    path: 'user-modify',
    component: EnableUserComponent,
  }, {
    path: 'user-update',
    component: UpdateUserComponent,
  }, {
    path: 'device-opts',
    component: AddDeviceComponent,
  }, {
    path: 'device-stat',
    component: DeviceStatusComponent,
  },{
    path: 'wifi-update',
    component: UpdateWifiComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
