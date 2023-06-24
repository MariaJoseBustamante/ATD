import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
const urlbackend = environment.urlbackend;

@Injectable({
  providedIn: 'root'
})
export class TongueService {

  constructor(private http: HttpClient) { }

  enviarImagenTest(data:any){
    console.log(data);
    let formData = new FormData();
    formData.append("images", data);
    console.log(formData);
    return this.http.post(urlbackend+"upload-second/",formData);
  }

}