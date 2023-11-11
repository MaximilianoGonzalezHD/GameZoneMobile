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
  compra: any;
  totalCompra: number = 0;
  detalles: any;
  userId: string | null | number; 


  constructor(private bd: DbservicioService, private router: Router) { 
    this.userId = localStorage.getItem('userId');
    

  }
  async ngOnInit() {
    try {
      this.compra = await this.bd.obtenerComprasPorUsuario(this.userId);
      const id = await this.bd.obtenerIdCompra(this.userId);
      this.detalles = await this.bd.obtenerDetallesCompraPorId(id);
   
      this.detalles = this.detalles.map(async (detalle: DetalleCompra) => {
        detalle.juego = await this.bd.obtenerJuegoPorId(detalle.videojuego_id);
        return detalle;
      });
      console.log(this.detalles);
      this.totalCompra = this.detalles.reduce(
        (total: number, detalle: DetalleCompra) => total + detalle.subtotal,
        0
      );
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }




}
  
