import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
const urlbackend = environment.urlbackend;

@Injectable({
  providedIn: 'root'
})
export class TongueService {

  constructor(private http: HttpClient) { }

  enviarimagen (data:any){
    console.log(data)
    return this.http.post(urlbackend+"upload/", data)
  }

}