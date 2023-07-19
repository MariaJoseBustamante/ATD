import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtdService {
  //accesoFacturacion = 'https://login.example.com';

  private _data:any;

  constructor() { }

  public get data(){
    return this._data;
  }

  public set data(data:any){
    this._data = data;
  }
}
