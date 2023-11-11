import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';

@Component({
  selector: 'app-juegos-pc',
  templateUrl: './juegos-pc.page.html',
  styleUrls: ['./juegos-pc.page.scss'],
})
export class JuegosPcPage implements OnInit {
  videojuegosp: any;
  constructor(private bd: DbservicioService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchjuegoPc().subscribe(item => {
          this.videojuegosp = item;
        }
        )
      }
    }

    )
  }
  iraljuego(slug: string) {
    this.router.navigate(['/juego-pc', slug]);
  }
  }
  

