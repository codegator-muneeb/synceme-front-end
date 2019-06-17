import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiConfig } from "../api-config"
import { HolidayAdapter, holiday, LeaveAdapter, leave, LeaveRequestAdapter, leaveRequest, TeamLeaveRequestAdapter, dayStatus, DayStatusAdapter, overAPeriodStatus, OverAPeriodStatusAdapter, ManagerReportAdapter, ManagerReportStatus } from './leave-service.adapters';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private baseUrl = ApiConfig.leaveBaseUrl

  constructor(
    private http: HttpClient,
    private holidayAdapter: HolidayAdapter,
    private leaveAdapter: LeaveAdapter,
    private leaveReqAdapter: LeaveRequestAdapter,
    private teamReqadapter: TeamLeaveRequestAdapter,
    private dayStatusAdapter: DayStatusAdapter,
    private oapAdapter: OverAPeriodStatusAdapter,
    private magReportAdp: ManagerReportAdapter
  ) { }

  getHolidays(companyCode: string): Observable<holiday[]> {
    const url = `${this.baseUrl}/holiday/${companyCode}`;
    return this.http.get(url).pipe(
    map((data: any[]) => data.map(item => this.holidayAdapter.adapt(item))),
    catchError(this.handleError<any>('Get Holidays')));
  }

  getLeaveBalance(companyCode: string, empid: string): Observable<leave[]> {
    const url = `${this.baseUrl}/balance`;
    const payload = {
      "companyCode": companyCode,
      "empid": empid 
    }
    return this.http.post(url, payload).pipe(
    map((data: any[]) => data.map(item => this.leaveAdapter.adapt(item))),
    catchError(this.handleError<any>('Get Leave Balance')));
  }

  getLeaveRequests(companyCode: string, empid: string): Observable<leaveRequest[]> {
    const url = `${this.baseUrl}/overview`;
    const payload = {
      "companyCode": companyCode,
      "empid": empid 
    }
    return this.http.post(url, payload).pipe(
    map((data: any[]) => data.map(item => this.leaveReqAdapter.adapt(item))),
    catchError(this.handleError<any>('Get Leave Requests')));
  }

  getTeamLeaveRequests(companyCode: string, managerid: string, status: Number): Observable<leaveRequest[]> {
    const url = `${this.baseUrl}/teamRequests`;
    const payload = {
      "companyCode": companyCode,
      "managerid": managerid,
      "status": status 
    }
    return this.http.post(url, payload).pipe(
    map((data: any[]) => data.map(item => this.teamReqadapter.adapt(item))),
    catchError(this.handleError<any>('Get Team Leave Requests')));
  }

  approveRequest(companyCode: string, empid: string, id: Number, type: number): Observable<string> {
    const url = `${this.baseUrl}/approve`;
    const payload = {
      "companyCode": companyCode,
      "empid": empid,
      "id": id,
      "type": type 
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    catchError(this.handleError<any>('Approve Requests')));
  }

  rejectRequest(companyCode: string, empid: string, id: Number, type: Number): Observable<string> {
    const url = `${this.baseUrl}/reject`;
    const payload = {
      "companyCode": companyCode,
      "empid": empid,
      "id": id,
      "type": type 
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    catchError(this.handleError<any>('Reject Requests')));
  }

  /* Dateformat: YYYYMMDD
  */
  getDayStatus(companyCode: string, empid: string, date: string): Observable<dayStatus> {
    const url = `${this.baseUrl}/dayStatus`;
    const payload = {
      "companyCode": companyCode,
      "empid": empid,
      "date": date
    }
    return this.http.post(url, payload).pipe(
    map((data: any) => this.dayStatusAdapter.adapt(data)),
    //catchError(this.handleError<any>('Reject Requests'))
    );
  }

  getOverAPeriodStatus(companyCode: string, empid: string, startDate: string, endDate): Observable<overAPeriodStatus[]> {
    const url = `${this.baseUrl}/overAPeriodStatus`;
    const payload = {
      "companyCode": companyCode,
      "empid": empid,
      "startDate": startDate,
      "endDate": endDate
    }
    return this.http.post(url, payload).pipe(
    map((data: any[]) => data.map(item => this.oapAdapter.adapt(item))),
    //catchError(this.handleError<any>('Reject Requests'))
    );
  }

  getManagerReportData(companyCode: string, empids: any, startDate: string, endDate): Observable<ManagerReportStatus[]> {
    const url = `${this.baseUrl}/managerReport`;
    const payload = {
      "companyCode": companyCode,
      "empids": empids,
      "startDate": startDate,
      "endDate": endDate
    }
    return this.http.post(url, payload).pipe(
    map((data: any[]) => data.map(item => this.magReportAdp.adapt(item))),
    //catchError(this.handleError<any>('Reject Requests'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  display(res: Response){
    console.log(res)
  }
}