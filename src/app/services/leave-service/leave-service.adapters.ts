import { Injectable } from '@angular/core';

export class ManagerReportStatus {
  EmpId: string
  Name: string
  Total_Hours: string

  constructor(item) {
    this.EmpId = item.Employee_ID;
    this.Name = item.Name;
    this.Total_Hours = item.Total_Hours;
  }
}

export class overAPeriodStatus {
  startDate: string
  endDate: string
  category: string;
  type: string;
  time: string;

  constructor(item) {
    this.startDate = item.startdate;
    this.endDate = item.enddate;
    this.category = item.category;
    this.type = item.type;
    this.time = item.time;
  }
}

export class dayStatus {
  category: string
  type: string
  hours: any;

  constructor(item) {
    this.category = item.category;
    this.hours = item.hours;
    this.type = item.type;
  }
}

export class holiday {
  name: string
  date: string
  type: string;

  constructor(item) {
    this.name = item.title;
    this.date = item.occur_date;
    this.type = item.type;
  }
}

export class leave {
  quota: string;
  fromDate: string;
  toDate: string;
  entitlement: string;
  remaining: string;

  constructor(item) {
    this.quota = item.name;
    this.fromDate = item.startdate;
    this.toDate = item.enddate;
    this.entitlement = item.entitlement;
    this.remaining = item.balance;
  }
}

export class leaveRequest {
  type: string;
  from: string;
  to: string;
  status: string;
  days: string;

  constructor(item) {
    this.type = item.name;
    this.from = item.startdate;
    this.to = item.enddate;
    this.status = item.status;

    var daysLeft = item.duration
    daysLeft = ((daysLeft - Math.floor(daysLeft / 15) * 15) / 9)
    this.days = daysLeft % 1 === 0
      ? String(daysLeft)
      : (daysLeft - Math.floor(daysLeft) > 0.5
        ? String(Math.ceil(daysLeft))
        : String(Math.floor(daysLeft) + 0.5));
  }
}

export class teamLeaveRequest {
  id: string;
  empid: string;
  fullname: string;
  type: string;
  from: string;
  to: string;
  status: string;
  days: string;
  typeId: Number

  constructor(item) {
    this.id = String(item.id);
    this.empid = item.emp_id;
    this.fullname = item.fullname;
    this.type = item.type;
    this.status = item.reqstatus;
    this.from = item.startdate;
    this.to = item.enddate;
    this.typeId = Number(item.typeid);

    var daysLeft = item.duration;
    daysLeft = ((daysLeft - Math.floor(daysLeft / 15) * 15) / 9)
    this.days = daysLeft % 1 === 0
      ? String(daysLeft)
      : (daysLeft - Math.floor(daysLeft) > 0.5
        ? String(Math.ceil(daysLeft))
        : String(Math.floor(daysLeft) + 0.5));
  }
}

interface Adapter<T> {
  adapt(item: any): T;
}

@Injectable({
  providedIn: 'root'
})
export class HolidayAdapter implements Adapter<holiday> {

  adapt(item: any): holiday {
    return new holiday(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LeaveAdapter implements Adapter<leave> {

  adapt(item: any): leave {
    return new leave(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestAdapter implements Adapter<leaveRequest> {

  adapt(item: any): leaveRequest {
    return new leaveRequest(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TeamLeaveRequestAdapter implements Adapter<teamLeaveRequest> {

  adapt(item: any): teamLeaveRequest {
    return new teamLeaveRequest(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DayStatusAdapter implements Adapter<dayStatus> {

  adapt(item: any): dayStatus {
    return new dayStatus(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OverAPeriodStatusAdapter implements Adapter<overAPeriodStatus> {

  adapt(item: any): overAPeriodStatus {
    return new overAPeriodStatus(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ManagerReportAdapter implements Adapter<ManagerReportStatus> {

  adapt(item: any): ManagerReportStatus {
    return new ManagerReportStatus(item);
  }
}