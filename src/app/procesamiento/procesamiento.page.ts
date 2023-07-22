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

  convertirFecha(fechaHoraOriginal:string) {
    // Paso 1: Parsear la cadena como fecha
    const fechaOriginal = new Date(fechaHoraOriginal);

    // Paso 2: Obtener los componentes de la fecha (día, mes, año)
    const dia = fechaOriginal.getDate().toString().padStart(2, "0");
    const mes = (fechaOriginal.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript comienzan desde 0 (enero = 0, febrero = 1, etc.)
    const anio = fechaOriginal.getFullYear().toString().slice(-2); // Obtenemos solo los últimos dos dígitos del año

    // Paso 3: Formatear la fecha en el formato deseado (DD/MM/AA)
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    return fechaFormateada;
  }

  obtenerHora(fechaHoraOriginal:string) {
    // Paso 1: Parsear la cadena como fecha
    const fechaOriginal = new Date(fechaHoraOriginal);

    // Paso 2: Obtener los componentes de la hora (hora y minutos)
    const hora = fechaOriginal.getHours();
    const minutos = fechaOriginal.getMinutes().toString().padStart(2, "0");

    // Paso 3: Determinar si es AM o PM
    let periodo = "AM";
    let horaFormateada = hora;
    if (hora >= 12) {
      periodo = "PM";
      horaFormateada = hora === 12 ? 12 : hora - 12;
    }

    // Paso 4: Formatear la hora en el formato deseado (20:20 pm)
    const horaFormateadaCompleta = `${horaFormateada}:${minutos} ${periodo}`;

    return horaFormateadaCompleta;
  }
}
