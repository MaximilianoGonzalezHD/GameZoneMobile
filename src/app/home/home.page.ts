import { Component } from '@angular/core';
import { LoadingService } from '../loading.service';
import { DbservicioService } from '../services/dbservicio.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private bd: DbservicioService,private loadingService: LoadingService) {

  }
  ngOnInit() {

    this.bd.setItem('userId', "null");
    this.bd.setItem('userRole', "null");
    // Al iniciar la página, mostrar la animación de carga
    this.loadingService.showLoading();

    // Simulamos una carga de 3 segundos
    setTimeout(() => {
      // Finalizamos la carga
      this.loadingService.hideLoading();
    }, 3000);
  }
}
