import { ViewChild, ElementRef, OnInit, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { TongueService } from '../services/tongue.service';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
  providers: [TongueService],
})
export class FotoPage implements OnInit {
  public photo?: SafeResourceUrl;
  public isDesktop: boolean = false;
  public isToastOpen = false;
  public message?: string;
  public data: any;
  public file: any;
  public photos: any[] = [];
  public isLoading : boolean = false;

  constructor(
    private platform: Platform,
    //private sanitizer: DomSanitizer,
    private tongueservice: TongueService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      (this.platform.is('mobile') && this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.isDesktop = true;
    }
  }

  async getPicture() {
    const image: any = await Camera.getPhoto({
      quality : 60,
      allowEditing : true,
      correctOrientation : true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    const datas = image.dataUrl;
    this.photo = datas;
    console.log(this.photo);

    this.transformImage(datas).then((res)=>{

      console.log("esto es file"+res);
      this.file = res;
    })

  }


  async transformImage(img:any){
    const response = await fetch(img);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", {type:blob.type});
    return file;
  }

  async enviarfoto() {
    this.isLoading = true;
    try {


      let resp = await firstValueFrom(
        this.tongueservice.enviarImagenTest(this.file)
      );
      this.messagesConfirmacion(JSON.stringify(resp))
      this.isLoading = false;
      this.router.navigate(['/procesamiento'])
    } catch (error: any) {
      console.log(error);
      this.mensajeDeError("El archivo seleccionado no es una imagen válida ");
      this.isLoading = false;
    }
  }

  private messagesConfirmacion(mensaje: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: mensaje,
    });
  }

  private mensajeDeError(mensaje: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje,
    });
  }

  private blobToFile(blob: Blob, fileName: string, mimeType: string): Promise<File> {
    return new Promise((resolve, reject) => {
      const file = new File([blob], fileName, { type: mimeType });
      resolve(file);
    });
  }

  public async enviarfoto2() {
    try {
      let resp = await firstValueFrom(this.tongueservice.getListImages());
      console.log(resp)
      this.data = resp;
    } catch (error: any) {
      console.log(error);
      this.mensajeDeError(JSON.stringify(error));
      this.data = error;
    }
  }
}




