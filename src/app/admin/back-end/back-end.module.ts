import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackEndRoutingModule } from './back-end-routing.module';
import { BackEndComponent } from './back-end.component';
import { AssignManagerComponent } from './assign-manager/assign-manager.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [BackEndComponent, AssignManagerComponent],
  imports: [
    CommonModule,
    BackEndRoutingModule,
    ThemeModule
  ]
})
export class BackEndModule { }
