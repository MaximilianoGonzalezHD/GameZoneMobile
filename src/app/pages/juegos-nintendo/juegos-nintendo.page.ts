import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';
@Component({
  selector: 'app-juegos-nintendo',
  templateUrl: './juegos-nintendo.page.html',
  styleUrls: ['./juegos-nintendo.page.scss'],
})
export class JuegosNintendoPage implements OnInit {
  videojuegosNintendo: any;
  constructor(private bd: DbservicioService, private router : Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchjuegoNintendo().subscribe(item => {
          this.videojuegosNintendo = item;
          console.log('Videojuegos:', item);
        }
        )
      }
    }

    )

}

iraljuego(slug: string) {
  this.router.navigate(['/juego', slug]);
}
}
