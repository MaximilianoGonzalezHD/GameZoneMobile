import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';
@Component({
  selector: 'app-juegos-xbox',
  templateUrl: './juegos-xbox.page.html',
  styleUrls: ['./juegos-xbox.page.scss'],
})
export class JuegosXboxPage implements OnInit {
  videojuegosX: any;
  constructor(private bd: DbservicioService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchjuegoXbox().subscribe(item => {
          this.videojuegosX = item;
        }
        )
      }
    }

    )
  }
  iraljuego(slug: string) {
    this.router.navigate(['/juego-xbox', slug]);
  }
}
