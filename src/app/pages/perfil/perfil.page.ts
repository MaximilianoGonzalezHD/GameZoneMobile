import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userId: string | null;
  usuario_list = [
    {
      id_usuariou: '',
      emailu: '',
      nombre_usuariou: '',
      contrasenau: '',
      nombreu: '',
      imagenu: '',
      rol_id: '',
    }

  ]
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
  ircambiarcontrasena(){
    this.router.navigate(['/cambiar-contrasena'])
  }
  irmodperfil(){
    this.router.navigate(['/mod-perfil'])
  }
}
