import { Injectable } from '@angular/core';

export class device{
    name: string
    deviceId: string

    constructor(item){
        this.name = item.name;
        this.deviceId = item.deviceid;
    }
}

interface Adapter<T> {
    adapt(item: any): T;
}

@Injectable({
    providedIn: 'root'
})
export class DeviceAdapter implements Adapter<device> {
  adapt(item: any): device {
    return new device(item);
  }
}