import { Injectable } from '@angular/core';

export class officialEntity {
  id: number
  name: string

  constructor(item) {
    this.id = Number(item.id);
    this.name = item.name;
  }
}

export class user {
  firstName: string
  lastName: string
  empId: string;

  constructor(item) {
    this.firstName = item.first_name;
    this.lastName = item.last_name;
    this.empId = item.emp_id;
  }
}

export class device {
  name: string
  deviceId: string

  constructor(item) {
    this.name = item.name;
    this.deviceId = item.device_id;
  }
}

interface Adapter<T> {
  adapt(item: any): T;
}

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<user> {

  adapt(item: any): user {
    return new user(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DeviceAdapter implements Adapter<device> {
  adapt(item: any): device {
    return new device(item);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OfficialEntityAdapter implements Adapter<officialEntity> {
  adapt(item: any): officialEntity {
    return new officialEntity(item);
  }
}