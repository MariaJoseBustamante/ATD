import { ViewChild, ElementRef, OnInit, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { TongueService } from '../services/tongue.service';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
  providers:[TongueService]
})
export class FotoPage implements OnInit {
  @ViewChild('filePicker', { static: false })
  public filePickerRef?: ElementRef<HTMLInputElement>;
  public photo?: SafeResourceUrl;
  public isDesktop: boolean = false;
  public isToastOpen = false;
  public message?: string;
  public data: any;
  public file:any;


  constructor(private platform: Platform, private sanitizer: DomSanitizer, private tongueservice:TongueService) {}

  ngOnInit(): void {
    if (
      (this.platform.is('mobile') && this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.isDesktop = true;
    }
  }

  async getPicture() {
    console.log("plataforma",Capacitor.getPlatform())
    this.isToastOpen = false;
    console.log('getPicture', this.isDesktop);

    // Take a photo
    const image: any = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    this.data=image;

    console.log('image', image.webPath);
    this.photo=image.webPath



    this.isToastOpen = true;
    this.message = 'Take photo success ' + JSON.stringify(image);

    // Convert Blob to File
    this.file = await this.blobToFile(this.photo as any, 'imagen.jpg');
    console.log('Converted file:', this.file);
  }

  enviarfoto(){
    let data={
      images:this.file
    }
    console.log(data) 
    
    this.tongueservice.enviarimagen(data).subscribe(
      res=>{
        console.log(res)
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
}
