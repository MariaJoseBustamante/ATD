import { Component, OnInit } from '@angular/core';
import { TongueService } from '../services/tongue.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AtdService } from '../services/atd.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit{
  // private id?:number;
  public data:any;

  //public seeInfo: boolean= false;

   constructor(private atdService:AtdService) {
  //   console.log("rutas",activatedroute.snapshot)
  //   console.log("params",activatedroute.snapshot.params)
  //   let params:any=activatedroute.snapshot.params
  //   console.log("paramsid",params.id)
  //   this.id=params.id;
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  //this.cargar();
  console.log("tab2 servise", this.atdService.data);
  this.data = this.atdService.data;

  }

}


