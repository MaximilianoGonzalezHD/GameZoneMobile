import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';
@Component({
  selector: 'app-lista-videojuegos',
  templateUrl: './lista-videojuegos.page.html',
  styleUrls: ['./lista-videojuegos.page.scss'],
})
export class ListaVideojuegosPage implements OnInit {

  list_videojuegos: any;

  constructor(private bd: DbservicioService, public router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchjuego().subscribe(item => {
          this.list_videojuegos = item;
        }
        )
      }
    }

    )
  }
  modificar(x: any){
    let NavigationExtras: NavigationExtras = {
      state: {
      id_juegoenviado: x.id_juego,
      nombrevenviado: x.nombrev,
      descripcionenviado: x.descripcion,
      precioenviado: x.precio,
      imagenvenviado: x.imagenv,
      seccion_idenviado: x.seccion_id,
      slugenviado: x.slug,
      }
    }
    this.router.navigate(['/mod-producto'],NavigationExtras)
  }
  eliminar(x: any){
    this.bd.borrarJuego(x.id_juego);
    this.bd.presentAlert("Juego Eliminado con exito");

  }
  agregarjuego(){
    this.router.navigate(['/agregar-producto'])
  }
}
