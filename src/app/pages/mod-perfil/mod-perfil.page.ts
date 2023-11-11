import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-mod-perfil',
  templateUrl: './mod-perfil.page.html',
  styleUrls: ['./mod-perfil.page.scss'],
})
export class ModPerfilPage implements OnInit {
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


  correou: String = "";
  nombreu: String = "";
  imagenu: any;
  nombreuop: String = "";

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
    }
    )
  };


  Modificar() {
    if(!this.correou){
      this.correou = this.usuario_list[0].emailu;
    }
    if(!this.nombreu){
      this.nombreu = this.usuario_list[0].nombre_usuariou;
    }
    if(!this.nombreuop){
      this.nombreuop = this.usuario_list[0].nombreu;
    }


    this.bd.actualizarUsuario(this.userId, this.correou, this.nombreu, this.nombreuop, this.imagenu);
    console.log('Valores para actualizar:', this.userId, this.correou, this.nombreu, this.nombreuop, this.imagenu);
    this.bd.presentAlert('Se han modificado sus datos!');
    this.router.navigate(['/home']);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });

    this.imagenu = image.dataUrl;
  }
}
