import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
const urlbackend = environment.urlbackend;

@Injectable({
  providedIn: 'root'
})
export class TongueService {

  constructor(private http: HttpClient) { }

  enviarImagenTest(data:File){
    console.log(data);
    let formData = new FormData();
    formData.append("image", data);
    console.log(formData.get('image'));
    return this.http.post(urlbackend+"upload-second/",formData);
  }

  getListImages(){
    return this.http.get(urlbackend+"list-images/");
  }
}