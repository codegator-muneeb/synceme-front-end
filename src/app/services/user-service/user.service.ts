import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiConfig } from "../api-config"
import { user, UserAdapter, device, DeviceAdapter, OfficialEntityAdapter, officialEntity } from './user-service.adapters';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = ApiConfig.userBaseUrl

  constructor(
    private http: HttpClient,
    private userAdapter: UserAdapter,
    private deviceAdapter: DeviceAdapter,
    private entityAdapter: OfficialEntityAdapter
  ) { }

  getAllUsers(companyCode: string): Observable<user[]> {
    const url = `${this.baseUrl}/getAll/${companyCode}`;
    return this.http.get(url).pipe(
    map((data: any[]) => data.map(item => this.userAdapter.adapt(item))),
    catchError(this.handleError<any>('Get All Users')));
  }

  getTeamUsers(companyCode: string, managerid: string): Observable<user[]> {
    const url = `${this.baseUrl}/team`;
    var payload = {
      "companyCode": companyCode,
      "managerid": managerid
    }
    return this.http.post(url, payload).pipe(
    map((data: any[]) => data.map(item => this.userAdapter.adapt(item))),
    catchError(this.handleError<any>('Get All Users')));
  }

  getUserDeviceList(companyCode: string, empId: string): Observable<device[]> {
    const url = `${this.baseUrl}/deviceList`;
    var payload = {
      'empid': empId,
      'companyCode': companyCode
    }
    return this.http.post(url, payload).pipe(
    map((data: any[]) => data.map(item => this.deviceAdapter.adapt(item))),
    catchError(this.handleError<any>('Get Device List')));
  }

  updateUser(companyCode: string, empId: string, rfid: string){
    const url = `${this.baseUrl}/update`;
    var payload = {
      "companyCode": companyCode,
      "empid": empId,
      "rfid": rfid
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    catchError(this.handleError<any>('Update User')));
  }

  addUserToDatabase(companyCode: string, userObject: any){
    const url = `${this.baseUrl}/add/${companyCode}`;
    var payload = userObject
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    //catchError(this.handleError<any>('Add User'))
    );
  }

  deleteUsers(companyCode: string, userList: any){
    const url = `${this.baseUrl}/delete`;
    var payload = {
      "companyCode": companyCode,
      "users": userList
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    catchError(this.handleError<any>('Delete Multiple User')));
  }
  
/* flag === 1 for enabled and flag === 0 for disabled
*/
  enableUser(companyCode: string, empid: any, flag: number){
    const url = `${this.baseUrl}/enable`;
    var payload = {
      "companyCode": companyCode,
      "empid": empid,
      "flag": flag
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    catchError(this.handleError<any>('Enable/Disable User')));
  }

  getOfficialEntity(companyCode: string, type: string): Observable<officialEntity>{
    const url = `${this.baseUrl}/${type}/${companyCode}`;

    return this.http.get(url).pipe(
      map((data: any[]) => data.map(item => this.entityAdapter.adapt(item))),
      catchError(this.handleError<any>('Get All Users')));

  }

  assignManager(companyCode: string, managerId: string, empIds: any): Observable<any>{
    const url = `${this.baseUrl}/assignManager`;
    const payload = {
      "companyCode": companyCode,
      "managerId": managerId,
      "empids": empIds 
    }

    return this.http.post(url, payload, {responseType:'text'}).pipe(
      map((data: any) => String(data)),
      //catchError(this.handleError<any>('Get All Users'))
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
}