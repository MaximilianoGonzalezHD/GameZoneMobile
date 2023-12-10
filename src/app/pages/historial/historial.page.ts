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
  detalles = [{
    nombrev: '',
    descripcion: '',
    cantidad: '',
    imagenv: '',
    precio: '',
    subtotal: 0,
    totalc: 0,
    fechac: '',
    seccion_id: '',
    rutc: '',
    usuario_id: '',
    slug: '',
    videojuego_id: '',
    id_juego: '',
    id_detallesc: '',
    id_comprac: '',
    compra_id: '',
    codigo: '',
    }
  ]
  userId: string | null | number;

  constructor(private bd: DbservicioService, private router: Router) {
    this.userId = localStorage.getItem('userId');
  }
  async ngOnInit() {
    try {
        this.detalles = await this.bd.obtenerDetallesCompraPorId(this.userId);
        console.log('Detalles con juegos:', this.detalles);

    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
    this.detalles.forEach(detalle => {
      detalle.codigo = this.generarCodigoAleatorio();
    });
  }
  private generarCodigoAleatorio(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';

    for (let i = 0; i < 10; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
    }

    return codigo;
  }
}
  
