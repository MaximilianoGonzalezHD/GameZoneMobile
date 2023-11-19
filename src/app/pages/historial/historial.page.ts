import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { Router } from '@angular/router';
import { DetalleCompra } from '../../interfaces/Detallecompra';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  totalCompra: number = 0;
  detalles: any = [];
  userId: string | null | number;

  constructor(private bd: DbservicioService, private router: Router) {
    this.userId = localStorage.getItem('userId');
  }
  async ngOnInit() {
    try {
  
      if(!this.detalles){
        this.detalles = await this.bd.obtenerDetallesCompraPorId(this.userId);

  
        console.log('Detalles con juegos:', this.detalles);
      } else {
        console.log('No hay compras para este usuario.');
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }
}
  
