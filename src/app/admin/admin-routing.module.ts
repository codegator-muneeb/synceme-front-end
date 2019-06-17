import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: 'device',
    loadChildren: './device/device.module#DeviceModule',
  }, 
  {
    path: 'backend',
    loadChildren: './back-end/back-end.module#BackEndModule',
  },
  {
    path: '',
    redirectTo: 'device',
    pathMatch: 'full',
  }, 
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

 }
