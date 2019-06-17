import { Injectable } from '@angular/core';

export class hardware {
    rfid: string
    finger: string

    constructor(item){
        this.rfid = item.rfid;
        this.finger = item.finger;
    }
}

interface Adapter<T> {
    adapt(item: any): T;
}

@Injectable({
    providedIn: 'root'
})
export class HardwareAdapter implements Adapter<hardware> {

  adapt(item: any): hardware {
    return new hardware(item);
  }
}