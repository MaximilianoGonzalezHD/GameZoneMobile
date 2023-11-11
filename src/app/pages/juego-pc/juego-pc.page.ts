import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';

@Component({
  selector: 'app-juego-pc',
  templateUrl: './juego-pc.page.html',
  styleUrls: ['./juego-pc.page.scss'],
})
export class JuegoPcPage implements OnInit {
  videojuego: any;
  userId: string | null;
  carrito: any[];

  constructor(private bd: DbservicioService, private router: Router, private route: ActivatedRoute) {
    this.userId = localStorage.getItem('userId');
    this.carrito = [];
   }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const slug = paramMap.get('slug');
      if (slug) {
        this.bd.buscarJuegoporslug(slug).then((videojuego) => {
          if (videojuego) {
            this.videojuego = videojuego;
          } else {
            console.log('No se encontró un videojuego con el slug proporcionado.');
          }
        });
      }
    });



  }


  agregarAlCarrito(videojuego_id: number) {
    this.bd.obtenerIdCarritoDeUsuario(this.userId)
      .then((carritoId) => {
        this.bd.obtenerItemCarrito(carritoId, videojuego_id)
          .then((itemCarrito) => {
            if (itemCarrito) {
              const nuevaCantidad = itemCarrito.cantidad + 1;
              this.bd.actualizarCantidadEnCarrito(videojuego_id, nuevaCantidad, carritoId)
                .then(() => {
                  this.bd.presentAlert("Se ha aumentado la cantidad en su carrito");
                  this.router.navigate(['/carrito']);
                })
                .catch(error => {
                  console.error(error);
                });
            } else {
              this.bd.agregarAlCarrito(videojuego_id, 1, carritoId)
                .then(() => {
                  this.bd.presentAlert("Se ha agregado su videojuego");
                  this.router.navigate(['/carrito']);
                })
                .catch(error => {
                  console.error(error);
                });
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
