import { Component, OnInit, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { AtdService } from '../services/atd.service';
import { TongueService } from '../services/tongue.service';
import { SystemService } from '../services/system.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit, OnDestroy {

  public data:any;
  public resp:any;
  public colorResultado = "";
  public position:any;
  colorfondo:string='#000000';
  private tongueId = 0;
  public description='';
  public resultados = [{nombre:"palido", color:"#F8F0F2"},{nombre:"rosado", color:"#F6A1B3"},{nombre:"rojo", color:"#E01E3E"},{nombre:"rojo intenso", color:"#CC0000"},{nombre:"violeta", color:"#AE509E"},{nombre:"azul", color:"#BDCBDA"} ]
  private unsubcribe : Subscription[] = [];

  constructor(private atdService:AtdService,private ElementRef:ElementRef, private tongeService:TongueService,
    private systemService:SystemService) {
      this.data = this.atdService.data;
    }
  ngOnDestroy(): void {
   this.unsubcribe.forEach(res =>res.unsubscribe())
  }

  ngOnInit() {
    this.tongeService.getdetalleColor(this.data.id).subscribe((resp:any) =>{
      console.log(resp);
      if(resp){
        this.colorResultado = resp.data;
        this.description= resp.descripcion;
        for (let index = 0; index < this.resultados.length; index++) {
          if (this.colorResultado == this.resultados[index].nombre) {
            this.position = index;

          }

        }
      }
    })
    this.data = this.atdService.data;


  }

}
