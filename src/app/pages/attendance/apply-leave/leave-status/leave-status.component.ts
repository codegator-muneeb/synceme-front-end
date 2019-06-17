import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { LeaveService } from '../../../../services/leave-service/leave.service';

@Component({
  selector: 'ngx-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.scss']
})
export class LeaveStatusComponent{

  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 6
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      type: {
        title: 'Type of Leave',
        type: 'string',
        //filter: false
      },
      from: {
        title: 'From',
        type: 'string',
        //filter: false
      },
      to: {
        title: 'To',
        type: 'string',
        //filter: false
      },
      status: {
        title: 'Status',
        type: 'string',
        //filter: false
      },
      days: {
        title: 'Days Used',
        type: 'string',
        //filter: false
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();
  user: any;

  constructor(private authService: NbAuthService,
              private leaveService: LeaveService) {

    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });
    this.leaveService.getLeaveRequests(this.user.companyCode, this.user.empid)
    .subscribe((response) => {
      const data = response
      this.source.load(data);
    }, 
    (error) => console.log(error));
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
