import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'ngx-approver-dialog',
  templateUrl: './approver-dialog.component.html',
  styleUrls: ['./approver-dialog.component.scss']
})
export class ApproverDialogComponent {

  criterias = [ 'UserName', 'LastName', 'Emp ID' ];

  constructor(protected ref: NbDialogRef<ApproverDialogComponent>) {}
  
    cancel() {
      this.ref.close();
    }
  
    submit(name) {
      this.ref.close(name);
    }
}


