import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BiometryType, NativeBiometric } from 'capacitor-native-biometric';

@Component({
  selector: 'app-mod-perfil',
  templateUrl: './mod-perfil.page.html',
  styleUrls: ['./mod-perfil.page.scss'],
})
export class ModPerfilPage implements OnInit {
  userId: string | null;
  huellaDigitalActivada: boolean = false;
  usuario_list = [
    {
      id_usuariou: '',
      emailu: '',
      nombre_usuariou: '',
      contrasenau: '',
      imagenu: '',
      nombreu: '',
      rol_id: '',
    }
  ];

  correou: string = "";
  nombreu: string = "";
  imagen: any;
  nombreuop: string = "";

  constructor(private bd: DbservicioService, private router: Router) {
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

    this.inicializarEstado();
  }

  inicializarEstado() {
    const estadoGuardado = localStorage.getItem('huellaDigitalActivada');
    if (estadoGuardado !== null) {
      this.huellaDigitalActivada = JSON.parse(estadoGuardado);
    }
  }

  actualizarLocalStorage() {
    localStorage.setItem('huellaDigitalActivada', JSON.stringify(this.huellaDigitalActivada));
  }

  Modificar() {
    if (!this.correou) {
      this.correou = this.usuario_list[0].emailu;
    }
    if (!this.nombreu) {
      this.nombreu = this.usuario_list[0].nombre_usuariou;
    }
    if (!this.nombreuop) {
      this.nombreuop = this.usuario_list[0].nombreu;
    }
    if (!this.imagen) {
      this.imagen = this.usuario_list[0].imagenu;
    }

    this.bd.actualizarUsuario(this.userId, this.correou, this.nombreu, this.nombreuop, this.imagen);
    console.log('Valores para actualizar:', this.userId, this.correou, this.nombreu, this.nombreuop, this.imagen);
    this.bd.presentAlert('Se han modificado sus datos!');
    this.router.navigate(['/home']);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelPhoto: "Usar una Foto",
      promptLabelPicture: "Tomar Una Foto",
    });

    this.imagen = image.dataUrl;
  }

  async cambiarEstadoHuellaDigital() {
    this.huellaDigitalActivada = !this.huellaDigitalActivada;
  
    if (this.huellaDigitalActivada) {
      console.log('Activando huella digital...');
      const username = this.usuario_list[0].nombre_usuariou;
      const password = this.usuario_list[0].contrasenau;
      const server = 'local'; // Puedes cambiar esto según tus necesidades
      const biometry_type = 'fingerprint'; // Cambia esto según tu lógica
  
      try {
        const result = await NativeBiometric.isAvailable();
  
        if (!result.isAvailable) {
          console.error('La biometría no está disponible en este dispositivo.');
          return;
        }
  
        const fingerprint = result.biometryType == BiometryType.FINGERPRINT;
  
        await this.bd.guardarCredenciales(username, password, server, biometry_type);
  
        console.log('Credenciales guardadas con éxito.');
      } catch (error) {
        console.error('Error al activar la huella digital:', error);
      }
    } else {
      console.log('Desactivando huella digital...');
      try {
        await this.bd.eliminarcredenciales();
      } catch (error) {
        console.error('Error al desactivar la huella digital:', error);
      }
    }
    localStorage.setItem('huellaDigitalActivada', JSON.stringify(this.huellaDigitalActivada));
  }
}
