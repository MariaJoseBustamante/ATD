import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SystemService {
  tongueId = new EventEmitter<any>();
  constructor() { }
}
