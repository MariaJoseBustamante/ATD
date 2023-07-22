import { Component, OnInit } from '@angular/core';
import { TongueService } from '../services/tongue.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AtdService } from '../services/atd.service';
import { SystemService } from '../services/system.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private id?: number;
  public data: any;

  constructor(
    private tongueservice: TongueService,
    private activatedroute: ActivatedRoute,
    private atdService:AtdService,
    private systemService:SystemService
  ) {
    console.log('rutas', activatedroute.snapshot);
    console.log('params', activatedroute.snapshot.params);
    let params: any = activatedroute.snapshot.params;
    console.log('paramsid', params.id);
    this.id = params.id;
    console.log(this.id)
    this.systemService.tongueId.emit(this.id);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  this.cargardatos();
  }
  async cargardatos() {
    try {
      let resp: any = await firstValueFrom(
        this.tongueservice.getListImagesdetalle(this.id as number)
      );

      console.log(resp);
      this.data = {
        ...resp.data,
        name_recortada:'http://192.168.0.185:8000/' + resp.data.name_recortada,
       paleta_colores:'http://192.168.0.185:8000/' + resp.data.paleta_colores,
       color_dominante: 'http://192.168.0.185:8000/' + resp.data.color_dominante,
       saburra: 'http://192.168.0.185:8000/' + resp.data.saburra,
       textura: 'http://192.168.0.185:8000/' + resp.data.textura,
       porcentaje:'' + resp.data.porcentaje

        //name_recortada:'http://192.168.100.18:8000/' + resp.data.name_recortada,
        //paleta_colores:'http://192.168.100.18:8000/' + resp.data.paleta_colores,
        //color_dominante: 'http://192.168.100.18:8000/' + resp.data.color_dominante,
        //saburra: 'http://192.168.100.18:8000/' + resp.data.saburra,
        //textura: 'http://192.168.100.18:8000/' + resp.data.textura,
        //porcentaje:''+resp.data.porcentaje

        //name_recortada:'http://192.168.1.45:8000/' + resp.data.name_recortada,
        //paleta_colores:'http://192.168.1.45:8000/' + resp.data.paleta_colores,
        //color_dominante: 'http://192.168.1.45:8000/' + resp.data.color_dominante,
        //saburra: 'http://192.168.1.45:8000/' + resp.data.saburra,
        //textura: 'http://192.168.1.45:8000/' + resp.data.textura,
        //porcentaje:''+resp.data.porcentaje

      };
      console.log(this.data);
      this.atdService.data = this.data;
    } catch (error: any) {
      console.log(error);

      // this.mensajeDeError(JSON.stringify(error));
      // this.data = error;
    }
  }
}
