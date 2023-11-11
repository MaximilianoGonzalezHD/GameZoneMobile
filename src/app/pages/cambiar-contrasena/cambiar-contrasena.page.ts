import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  contrau: string = "";
  confirmcontratrau: string = "";
  
  userId: string | null;
  usuario_list = [
    {
      id_usuariou: '',
      emailu: '',
      nombre_usuariou: '',
      contrasenau: '',
      nombreu: '',
      rol_id: '',
    }

  ]

  constructor( private bd: DbservicioService, private router: Router) { 
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.buscarUsuarioPorId(this.userId)
          .then(item => {
            this.usuario_list = item;
            console.log('Datos del usuario:', this.usuario_list);
          })
          .catch(error => {
            console.error('Error al buscar el usuario:', error);
          });
      }
    });
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
    this.bd.actualizarcontrasena(this.userId, this.contrau);
    this.bd.presentAlert('Se ha modificado la contraseña.');
    this.router.navigate(['/perfil']);
  }
}
