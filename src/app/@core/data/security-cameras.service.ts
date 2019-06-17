import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

export class Camera {
  title: string;
  source: string;
}

@Injectable()
export class SecurityCamerasService {

  private cameras: Camera[] = [
    {
      title: 'Bhimketal',
      source: 'assets/images/camera1.jpg',
    },
    {
      title: 'Shillong',
      source: 'assets/images/camera2.jpg',
    },
    {
      title: 'France International Summit',
      source: 'assets/images/camera3.jpg',
    },
    {
      title: 'Tech Summit',
      source: 'assets/images/camera4.jpg',
    },
  ];

  getCamerasData(): Observable<Camera[]> {
    return observableOf(this.cameras);
  }
}
