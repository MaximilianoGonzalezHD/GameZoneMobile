import { Component, OnInit } from '@angular/core';
import { DbservicioService } from '../../services/dbservicio.service';
import { CarritoItem } from '../../interfaces/carrito-item';

@Component({
  selector: 'app-datos-pago',
  templateUrl: './datos-pago.page.html',
  styleUrls: ['./datos-pago.page.scss'],
})
export class DatosPagoPage implements OnInit {
  correo: string = '';
  rut: string = '';
  rutAuth: string = '';
  carritoId: number;
  userId: string | null | number;
  totalCarrito: number = 0;
  carrito: CarritoItem[] = [];
  usuario_list = [
    {
      id_usuariou: '',
      emailu: '',
      nombre_usuariou: '',
      contrasenau: '',
      nombreu: '',
      imagenu: '',
      rol_id: '',
      rut: '',
    }
  ]

  constructor(private bd: DbservicioService) {
    this.userId = localStorage.getItem('userId');
    this.carritoId = 1;
  }
  ngOnInit() {
    if (this.userId) {
      this.bd.obtenerIdCarritoDeUsuario(this.userId)
        .then((carritoId) => {
          this.carritoId = carritoId;
          this.actualizarCarrito();
        })
        .catch((error) => {
          console.error('Error al obtener el carrito de usuario:', error);
        });
    }

    this.bd.obtenerCarrito().subscribe((carrito) => {
      this.carrito = carrito;
      this.actualizarTotalCarrito();
    });

    this.bd.dbState().subscribe(res => {
      if (res) {

          this.bd.buscarUsuarioPorId(this.userId)
            .then(item => {
              this.usuario_list = item;
              console.log('Datos del usuario:', this.usuario_list);
            })
            .catch(error => {
              console.error('Error al buscar el usuario:', error);
            });
      }
    }
    )
  }
  comprar() {
    if (!this.userId) {
      if (!this.validarRut(this.rut)) {
        this.bd.presentAlert('Rut Invalido!')
        return;
      }
      if (!this.validarCorreo(this.correo)) {
        this.bd.presentAlert('Correo Invalido!')
        return;
      }
    }
    this.bd.procesarCompraNoRegistrado(this.rut, this.correo, this.totalCarrito);
  }

  comprarconusuario() {
    if(!this.rutAuth){
      this.rutAuth = this.usuario_list[0].rut;
    }
    this.bd.procesarCompraRegistrado(this.rutAuth, this.userId, this.totalCarrito);
  }

  actualizarTotalCarrito() {
    this.totalCarrito = this.carrito.reduce((total, item) => {
      total += item.cantidad * item.precio;
      return total;
    }, 0);
  }
  async actualizarCarrito() {
    await this.bd.actualizarCarrito(this.carritoId);
  }
  validarRut(rut: string): boolean {
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-\d{1,2}$/;
    return rutRegex.test(rut);
  }
  validarCorreo(correo: string): boolean {
    return correo.includes('.') && correo.includes('@');
  }

  hasUserRole(role: string): boolean {
    const storedRole = localStorage.getItem('userRole');
    return storedRole === role;
  }
}




