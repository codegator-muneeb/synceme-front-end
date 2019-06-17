import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { LeaveService } from '../../../services/leave-service/leave.service'

@Component({
  selector: 'ngx-information',
  styleUrls: ['./information.component.scss'],
  templateUrl: './information.component.html',
  
})
export class InformationComponent{

  user: any;
  leaves = [];
  holidays = [];

  constructor(private authService: NbAuthService,
              private leaveService: LeaveService)
  {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
      }
    });

    this.leaveService.getHolidays(this.user.companyCode).subscribe((response) => this.checkAssignHolidays(response), 
                                                              (error) => console.log(error),);

    this.leaveService.getLeaveBalance(this.user.companyCode, this.user.empid).subscribe((response) => this.checkAssignLeaves(response), 
                                                              (error) => console.log(error),);                     
  }

  checkAssignHolidays(response){
    console.log(response);
    if(typeof response !== "undefined"){
      this.holidays = response
    } else{
      console.log("Current Value not received")
    }
  }

  checkAssignLeaves(response){
    console.log(response);
    if(typeof response !== "undefined"){
      this.leaves = response
    } else{
      console.log("Current Value not received")
    }
  }
  
}
