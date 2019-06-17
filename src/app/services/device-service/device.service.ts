import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiConfig } from "../api-config"
import { device, DeviceAdapter } from "./device-service.adapters"


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseUrl = ApiConfig.deviceBaseUrl

  constructor(
    private http: HttpClient,
    private deviceAdapter: DeviceAdapter
  ) { }

  getRegisteredDevices(companyCode: string): Observable<device[]> {
    const url = `${this.baseUrl}/get/reg/${companyCode}`;
    return this.http.get(url).pipe(
    map((data: any[]) => data.map(item => this.deviceAdapter.adapt(item))),
    // catchError(this.handleError<any>('Registered Devices'))
    );
  }

  getUnregisteredDevices(companyCode: string): Observable<device[]> {
    const url = `${this.baseUrl}/get/unreg/${companyCode}`;
    return this.http.get(url).pipe(
    map((data: any[]) => data.map(item => this.deviceAdapter.adapt(item))),
    // catchError(this.handleError<any>('Unregistered Devices'))
    );
  }

  addDevice(companyCode: string, deviceID: string, alias: string, type: number): Observable<string> {
    const url = `${this.baseUrl}/add`;
    const payload = {
      "companyCode": companyCode,
      "deviceId": deviceID,
      "alias": alias,
      "type": type 
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Add a device'))
    );
  }

  registerDevice(deviceId: string): Observable<string>{
    const url = `${this.baseUrl}/register/${deviceId}`;
    return this.http.get(url, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Register a Devices'))
    );
  }

  deleteDevice(deviceId: string, companyCode: string): Observable<string>{
    const url = `${this.baseUrl}/delete`;
    const payload = {
      "companyCode": companyCode,
      "deviceId": deviceId
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Add a device'))
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