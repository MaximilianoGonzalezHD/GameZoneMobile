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
  compras: any[] = [];
  totalCompra: number = 0;
  detalles: DetalleCompra[] = [];
  userId: string | null | number;

  constructor(private bd: DbservicioService, private router: Router) {
    this.userId = localStorage.getItem('userId');
  }

  async ngOnInit() {
    try {
      // Obtener todas las compras del usuario
      this.compras = await this.bd.obtenerComprasPorUsuario(this.userId);

      if (this.compras.length > 0) {
        // Si hay compras, obtener detalles de la primera compra
        const idPrimeraCompra = this.compras[0].id; // Asegúrate de que tu objeto de compra tenga una propiedad 'id'
        this.detalles = await this.bd.obtenerDetallesCompraPorId(idPrimeraCompra);

        // Mapear los detalles
        this.detalles = await Promise.all(this.detalles.map(async (detalle: DetalleCompra) => {
          detalle.juego = await this.bd.obtenerJuegoPorId(detalle.videojuego_id);
          return detalle;
        }));

        // Calcular el total de la primera compra
        this.totalCompra = this.detalles.reduce(
          (total: number, detalle: DetalleCompra) => total + detalle.subtotal,
          0
        );
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }
}
  
