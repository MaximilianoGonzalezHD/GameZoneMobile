import { Component } from '@angular/core';
import { DbservicioService } from '../../services/dbservicio.service';
import { Router } from '@angular/router';
import { BiometryType, NativeBiometric } from 'capacitor-native-biometric';

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
credencialesExisten: boolean = false;
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
    this.verificarExistenciaCredenciales();
  }


  async verificarExistenciaCredenciales() {
    const credentials = await this.bd.obtenerCredenciales();
    this.credencialesExisten = credentials !== null;
  }
  async login() {
    const email = this.email;
    const contrasena = this.password;
  
    const id = await this.bd.obtenerIdUsuarioPorEmail(email);
    const rol = await this.bd.obtenerRolUsuarioPorEmail(email);
  
    if (email.trim() === '' || contrasena.trim() === '') {
      this.bd.presentAlert('Por favor, complete ambos campos.');
      return;
    }
  
    try {
      const isAuthenticated = await this.bd.autenticarUsuario(email, contrasena);
  
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

  async performBiometricVerification() {
    const credentials = await this.bd.obtenerCredenciales();
  
    // Verificar si las credenciales son nulas
    if (!credentials) {
      console.error('Credenciales no encontradas.');
      return;
    }
  
    const result = await NativeBiometric.isAvailable();
    
    // Verificar la disponibilidad del escáner biométrico
    if (!result.isAvailable) {
      console.error('Escáner biométrico no disponible.');
      return;
    }
  
    const username = credentials.username;
    const password = credentials.password;
    const id = await this.bd.obtenerIdUsuarioPorusuario(username);
    const rol = await this.bd.obtenerRolUsuarioPorusuario(username);
  
    // Verificar la autenticación del usuario mediante usuario y contraseña
    const isAuthenticated = await this.bd.autenticarUsuarioHuella(username, password);
  
    if (!isAuthenticated) {
      console.error('Autenticación del usuario fallida.');
      return;
    }
  
    // Realizar la verificación biométrica
    const verified = await NativeBiometric.verifyIdentity({
      reason: "Huella Digital",
      title: "Inicio de Sesión",
      description: "Coloque su dedo en el lector",
    })
      .then(() => true)
      .catch(() => false);
  
    // Si la verificación biométrica es exitosa, continuar con las operaciones adicionales
    if (!verified) {
      this.bd.presentAlert('Verificación biométrica fallida.');
      return;
    }
  
    // Resto del código si ambas autenticaciones son exitosas
    console.log('Usuario autenticado con éxito.');
    this.bd.setItem('userId', id);
    this.bd.setItem('userRole', rol);
    this.bd.crearCarrito(id);
    this.bd.presentAlert('Se ha ingresado con éxito!');
    this.router.navigate(['/home']);
  }
}
