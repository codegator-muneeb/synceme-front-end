import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiConfig } from "../api-config"
import { hardware, HardwareAdapter } from "./device-mqtt.adapter";

// class hardware {
//     rfid: string
//     finger: string

//     constructor(item){
//         this.rfid = item.rfid;
//         this.finger = item.finger;
//     }
// }

// interface Adapter<T> {
//     adapt(item: any): T;
// }

// @Injectable({
//     providedIn: 'root'
// })
// class HardwareAdapter implements Adapter<hardware> {

//   adapt(item: any): hardware {
//     return new hardware(item);
//   }
// }


@Injectable({
  providedIn: 'root'
})
export class ScanHardwareService {

  private baseUrl = ApiConfig.mqttBaseUrl

  constructor(
    private http: HttpClient,
    private adapter: HardwareAdapter,
  ) { }

  getId(companyCode: string): Observable<hardware> {
    const url = `${this.baseUrl}/scan/${companyCode}`;
    return this.http.get(url).pipe(
    map((data: any) => this.adapter.adapt(data)),
    // catchError(this.handleError<any>('Scan Hardware'))
    );
  }

  updateUser(userDetails: any, deviceIds: any): Observable<string>{
    const url = `${this.baseUrl}/update_user`;
    var payload = {
      "userDetails": userDetails,
      "deviceIds": deviceIds
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Mqtt Update User'))
    );
  }

  addUser(userDetails: any, deviceIds: any): Observable<string>{
    const url = `${this.baseUrl}/add_user`;
    var payload = {
      "userDetails": userDetails,
      "deviceIds": deviceIds
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Mqtt Add User'))
    );
  }

  registerDevice(deviceId: string, name: string): Observable<string>{
    const url = `${this.baseUrl}/reg_device`;
    var payload = {
      "deviceId": deviceId,
      "name": name
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Mqtt Regsiter Device'))
    );
  }

  deleteUser(userDetails: any, deviceIds: any): Observable<string>{
    const url = `${this.baseUrl}/del_user`;
    var payload = {
      "userDetails": userDetails,
      "deviceIds": deviceIds
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Mqtt Delete User'))
    );
  }

  enableUser(userDetails: any, deviceIds: any, userAction: boolean): Observable<string>{
    const url = `${this.baseUrl}/enable_user`;
    var payload = {
      "userDetails": userDetails,
      "deviceIds": deviceIds,
      "userAction": userAction
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Mqtt Enable User'))
    );
  }

  enableDevice(deviceId: string, flag: boolean): Observable<string>{
    const url = `${this.baseUrl}/enable_dev`;
    var payload = {
      "deviceId": deviceId,
      "flag": flag
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Mqtt Enable Device'))
    );
  }

  resetDevice(deviceId: string): Observable<string>{
    const url = `${this.baseUrl}/reset_dev`;
    var payload = {
      "deviceId": deviceId,
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Mqtt Reset Device'))
    );
  }

  updateWifi(ssid: string, password: string, deviceIds: any): Observable<string>{
    const url = `${this.baseUrl}/wifi_update`;
    var payload = {
      "ssid": ssid,
      "password": password,
      "deviceIds": deviceIds
    }
    return this.http.post(url, payload, {responseType:'text'}).pipe(
    map((data: any) => String(data)),
    // catchError(this.handleError<any>('Mqtt Update Wifi'))
    );
  }

  getDeviceStatus(deviceId: string): Observable<any>{
    const url = `${this.baseUrl}/dev_status`;
    var payload = {
      "deviceId": deviceId
    }
    return this.http.post(url, payload).pipe(
    map((data: any) => data),
    // catchError(this.handleError<any>('Get Device Status'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  display(res: Response){
    console.log(res)
  }
}