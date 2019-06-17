import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackEndComponent } from './back-end.component';
import { AssignManagerComponent } from './assign-manager/assign-manager.component';

const routes: Routes = [{
  path: '',
  component: BackEndComponent,
  children: [{
    path: 'assign-manager',
    component: AssignManagerComponent,
  },],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackEndRoutingModule { }
