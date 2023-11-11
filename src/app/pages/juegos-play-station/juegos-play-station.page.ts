import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';
@Component({
  selector: 'app-juegos-play-station',
  templateUrl: './juegos-play-station.page.html',
  styleUrls: ['./juegos-play-station.page.scss'],
})
export class JuegosPlayStationPage implements OnInit {
  playstation: any;
  constructor(private bd: DbservicioService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchjuegoPlaystation().subscribe(item => {
          this.playstation = item;
        }
        )
      }
    }

    )
  }
  iraljuego(slug: string) {
    this.router.navigate(['/juego-plei', slug]);
  }

}
