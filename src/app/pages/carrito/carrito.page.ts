import { Component, OnInit } from '@angular/core';
import { CarritoItem } from '../../interfaces/carrito-item';
import { DbservicioService } from '../../services/dbservicio.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: CarritoItem[] = [];
  totalCarrito: number = 0;
  carritoId: number;
  userId: string | null;

  constructor(private bd: DbservicioService) {
    this.userId = localStorage.getItem('userId');
    this.carritoId = 1;
  }

  async ngOnInit() {
    if (this.userId) {
      this.carritoId = await this.bd.obtenerIdCarritoDeUsuario(this.userId);
    }
    this.actualizarCarrito();

    this.bd.obtenerCarrito().subscribe((carrito) => {
      this.carrito = carrito;
      this.actualizarTotalCarrito();
    });
  }

  actualizarTotalCarrito() {
    this.totalCarrito = this.carrito.reduce((total, item) => {
      total += item.cantidad * item.precio;
      return total;
    }, 0);
  }

  actualizarCantidad(videojuego: CarritoItem, nuevaCantidad: number) {
    this.bd.actualizarCantidadEnCarrito(videojuego.id_juego, nuevaCantidad, this.carritoId)
      .then(() => {
        this.actualizarCarrito();
      })
      .catch(error => {
        console.error(error);
      });
  }

  vaciarCarrito() {
    this.bd.vaciarCarrito(this.carritoId)
      .then(() => {
        this.actualizarCarrito();
      })
      .catch(error => {
        console.error(error);
      });
  }

  async actualizarCarrito() {
    await this.bd.actualizarCarrito(this.carritoId);
  }
}