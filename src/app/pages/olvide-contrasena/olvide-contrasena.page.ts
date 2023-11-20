import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.page.html',
  styleUrls: ['./olvide-contrasena.page.scss'],
})
export class OlvideContrasenaPage implements OnInit {
  validacion: boolean = false;
  correo: string = "";

  constructor(private router: Router, private db: DbservicioService) { }

  ngOnInit() {
  }

  async Validacion() {
    try {
      this.validacion = await this.db.validarCorreoExistente(this.correo);

      if (this.validacion) {
        this.db.setItem('correo', this.correo);
        this.router.navigate(['/codigo']);
      } else {
        this.db.presentAlert('El correo no existe');
      }
    } catch (error) {
      console.error('Error al validar correo:');
      this.db.presentAlert('el correo no existe');
    }
  }
}