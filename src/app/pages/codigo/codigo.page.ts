import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {
  codigoIngresado: string | null = "";
  correo: string | null = "";

  constructor(private router: Router, private db: DbservicioService) {
    this.correo = localStorage.getItem('correo');
  }

  ngOnInit() {
  }

  async Validacioncodigo() {
    try {
      if (!this.correo) {
        console.error('Correo no disponible.');
        this.db.presentAlert('Correo no disponible.');
        return;
      }

      const codigoEncontrado = await this.db.buscarCodigoUsuarioPorCorreo(this.correo);

      if (!codigoEncontrado) {
        console.log('No se encontró código para el usuario con correo:', this.correo);
        this.db.presentAlert('No se encontró código para el usuario.');
        return;
      }

      if (codigoEncontrado === this.codigoIngresado) {
        this.router.navigate(['/cambiar-contrasena-seg']);
      } else {
        console.log('Código incorrecto.');
        this.db.presentAlert('Código incorrecto.');
      }

    } catch (error) {
      console.error('Error con el código:', error);
      this.db.presentAlert('Error con el código.');
    }
  }
}
