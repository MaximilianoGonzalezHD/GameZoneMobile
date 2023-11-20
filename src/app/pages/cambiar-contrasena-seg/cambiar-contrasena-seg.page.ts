import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-cambiar-contrasena-seg',
  templateUrl: './cambiar-contrasena-seg.page.html',
  styleUrls: ['./cambiar-contrasena-seg.page.scss'],
})
export class CambiarContrasenaSegPage implements OnInit {
  contrau: string = "";
  confirmcontratrau: string = "";
  correo: string | null;
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
  constructor(private bd: DbservicioService, private router: Router) {
    this.correo = localStorage.getItem('correo');
 
  }

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario() {
    try {
      if (this.correo) {
        this.usuario_list = await this.bd.buscarUsuarioPorcorreo(this.correo);
      } else {
        console.error('Correo no disponible.');
        this.bd.presentAlert('Correo no disponible.');
      }
    } catch (error) {
      console.error('Error al obtener datos de usuario por correo:', error);
      this.bd.presentAlert('Error al obtener datos de usuario.');
    }
  }

  cambiar() {
    // Validar longitud
    if (this.contrau.length < 5 || this.contrau.length > 30) {
      this.bd.presentAlert('La contraseña debe tener entre 5 y 30 caracteres.');
      return;
    }

     // Validar mayúscula usando una expresión regular
     const uppercaseRegex = /[A-Z]/;
     if (!uppercaseRegex.test(this.contrau)) {
       this.bd.presentAlert('La contraseña debe contener al menos una mayúscula.');
       return;
     }
   
     // Validar carácter especial usando una expresión regular
     const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
     if (!specialCharRegex.test(this.contrau)) {
       this.bd.presentAlert('La contraseña debe contener al menos un carácter especial.');
       return;
     }
   
     // Validar que las contraseñas coincidan
     if (this.contrau !== this.confirmcontratrau) {
       this.bd.presentAlert('Las contraseñas no coinciden.');
       return;
     }

    // Si pasa todas las validaciones, proceder con la actualización de la contraseña
    if ( this.usuario_list) {  // Verificar que userId y usuario_list no sean null
      this.bd.actualizarcontrasena(this.usuario_list[0].id_usuariou, this.contrau);
      this.bd.presentAlert('Se ha modificado la contraseña.');
      this.router.navigate(['/login']);
    } else {
      console.error('Error: userId o usuario_list es null.');
      this.bd.presentAlert('Error al actualizar la contraseña.');
    }
  }
}
