import { ViewChild, ElementRef, OnInit, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { TongueService } from '../services/tongue.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
  providers: [TongueService]
})
export class FotoPage implements OnInit {
  @ViewChild('filePicker', { static: false })
  public filePickerRef?: ElementRef<HTMLInputElement>;
  public photo?: SafeResourceUrl;
  public isDesktop: boolean = false;
  public isToastOpen = false;
  public message?: string;
  public data: any;
  public file: any;

  public photos: any[] = [];


  constructor(private platform: Platform, private sanitizer: DomSanitizer, private tongueservice: TongueService, private messageService: MessageService) { }

  ngOnInit(): void {
    if (
      (this.platform.is('mobile') && this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.isDesktop = true;
    }
    this.loadDataImage();
  }

  async loadDataImage() {
    let imagaList = await this.tongueservice.getListImages().subscribe(
      res => {
        console.log("Se imprime la lista de imagenes");
        console.log(res);
      }
    )

  }

  async getPicture() {

    this.isToastOpen = false;


    // Take a photo
    const image: any = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.data = image;

    console.log('image', image.webPath);
    this.photo = image.webPath



    this.isToastOpen = true;
    this.message = 'Take photo success ' + JSON.stringify(image);

    // Convert Blob to File
    this.file = await this.blobToFile(this.photo as any, 'imagen.jpg');
    console.log('Converted file:', this.file);
  }

  enviarfoto() {
    if (!this.file) {
      this.mensajeDeError('Suba una imagen');
      return
    }

    this.tongueservice.enviarImagenTest(this.file).subscribe(
      res => {
        console.log(res)
        this.messagesConfirmacion('Se subio la imagen con exito');
      }
    )
  }

  async saveImage(imagePath: string) {
    const base64Data = await this.readAsBase64(imagePath);

    if (base64Data) {
      const fileName = new Date().getTime() + '.jpg';
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      return savedFile;
    }

    return null;
  }

  async blobToFile(blob: Blob, fileName: string): Promise<File> {
    return new File([blob], fileName, { type: blob.type });
  }

  async readAsBase64(path: string) {

    if (Capacitor.getPlatform() === 'web') {
      // Read the file as a data URL
      const file = await fetch(path);
      const blob = await file.blob();
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } else {
      // Use Capacitor's Filesystem API to read the file as base64
      const file = await Filesystem.readFile({ path: path });
      return file.data;
    }
  }

  private messagesConfirmacion(mensaje: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: mensaje,
    })
  }

  private mensajeDeError(mensaje: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje,
    })
  }

  async capturaImagen(event: any) {
    const image: any = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });


    this.photos.unshift({
      filepath: "soon...",
      webviewPath: image.webPath
    });

    console.log('la foto que se tomo', this.photos)

    console.log('esta es la imagen', image);
    const file = new Blob([image], { type: 'image/jpg' });
    const file_img = this.blobToFileTesting(file, 'image.jpg');
    console.log(file_img);
    this.file = file_img;

  }

  blobToFileTesting(blob:any, fileName:any) {
    // Create a new File object
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }


  handleImageUpload(event: any) {
    this.messagesConfirmacion('Se selecciono una imagen')
    const file: File = event.target.files[0]; // Accede al primer archivo seleccionado
    this.messagesConfirmacion(file.toString());
    
    if (file && file.type.startsWith('image/')) {
      // El archivo es una imagen válida
      // Aquí puedes realizar las operaciones necesarias con el archivo de imagen, como cargarlo en un servidor o procesarlo localmente
      console.log('Archivo de imagen seleccionado:', file);
      this.file = file;
      
    this.tongueservice.enviarImagenTest(this.file).subscribe(
      res => {
        console.log(res)
        this.messagesConfirmacion('Se subio la imagen con exito');
      }
    )
    } else {
      // El archivo no es una imagen válida
      console.error('El archivo seleccionado no es una imagen válida');
      this.mensajeDeError('El archivo seleccionado no es una imagen válida');
    }
  }


}
