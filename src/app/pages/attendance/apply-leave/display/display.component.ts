import { Component} from '@angular/core';
import { ApproverDialogComponent } from './approver-dialog/approver-dialog.component'
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent{
  default = ' ';
  leaves = ['Privelege Leave', 'Casual Leave', 'Sick Leave'];

  constructor(private dialogService: NbDialogService) {}

  openApproverDialog() {
    this.dialogService.open(ApproverDialogComponent);
  }
}
