import { Component } from '@angular/core';
import { DbservicioService } from '../../services/dbservicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  usuario_list = [
    {
      id_usuariou: '',
      emailu: '',
      nombre_usuariou: '',
      contrasenau: '',
      nombreu: '',
      rol_id: '',
      rut: '',
    }
]

email: string = '';
password: string = '';

  constructor(private bd: DbservicioService, private router: Router) {}
  
  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchusuario().subscribe(item => {
          this.usuario_list = item;
        }

        )
      }
    }
    )
  }
  async login() {
    const email = this.email;
    const contraseña = this.password;
  
    const id = await this.bd.obtenerIdUsuarioPorEmail(email);
    const rol = await this.bd.obtenerRolUsuarioPorEmail(email);
  
    if (email.trim() === '' || contraseña.trim() === '') {
      this.bd.presentAlert('Por favor, complete ambos campos.');
      return;
    }
  
    try {
      const isAuthenticated = await this.bd.autenticarUsuario(email, contraseña);
  
      if (isAuthenticated) {
        this.bd.setItem('userId', id);
        this.bd.setItem('userRole', rol);
        this.bd.crearCarrito(id);
        this.bd.presentAlert('Se ha ingresado con éxito!');
        this.router.navigate(['/home']);
      } else {
        this.bd.presentAlert('Usuario no existe o contraseña incorrecta.');
      }
    } catch (error) {
      console.error('Error al autenticar el usuario:', error);
      this.bd.presentAlert('Error al autenticar el usuario');
    }
  }
  registrarse() {
    this.router.navigate(['/register']);
  }
}