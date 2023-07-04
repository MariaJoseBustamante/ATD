import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
const urlbackend = environment.urlbackend;

@Injectable({
  providedIn: 'root'
})
export class TongueService {
  enviarimagen(data: { images: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient,private messageService: MessageService) { }

  enviarImagenTest(data:File){
    console.log(data);
    let formData = new FormData();
    formData.append("image", data);
    console.log(formData.get('image'));
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Error',
    //   detail: urlbackend+"upload-second/",

    // });
    return this.http.post(urlbackend+"upload-second/",formData);
  }

  getListImages(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(urlbackend+"list-images/",{ headers: headers });
  }

}
