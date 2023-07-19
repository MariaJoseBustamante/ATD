import { Component, OnInit } from '@angular/core';
import { TongueService } from '../services/tongue.service';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procesamiento',
  templateUrl: './procesamiento.page.html',
  styleUrls: ['./procesamiento.page.scss'],
})
export class ProcesamientoPage implements OnInit {
  public data: any;
  constructor(
    private tongueservice: TongueService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.enviarfoto2();
  }
  public async enviarfoto2() {
    try {
      let resp = await firstValueFrom(this.tongueservice.getListImages());
      console.log(resp);
      this.data = resp;
    } catch (error: any) {
      console.log(error);
      this.mensajeDeError(JSON.stringify(error));
      this.data = error;
    }
  }
  private mensajeDeError(mensaje: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje,
    });
  }
}
