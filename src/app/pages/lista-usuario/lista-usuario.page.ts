import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.page.html',
  styleUrls: ['./lista-usuario.page.scss'],
})
export class ListaUsuarioPage implements OnInit {
  nombre_rol = "";

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

  constructor(private bd: DbservicioService, public router: Router) { }

  ngOnInit() {
    console.log(this.usuario_list[0]);
    console.log(this.nombre_rol)

    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchusuario().subscribe(item => {
          this.usuario_list = item;
        }

        )
      }
    }
    );

    this.usuario_list.forEach(usuario => {
      if (usuario.rol_id === '1') {
        this.nombre_rol = 'Usuario';
      } else if (usuario.rol_id === '2') {
        this.nombre_rol = 'Administrador';
      }
    });
    
  }
  eliminar(x: any){
    this.bd.borrarUsuario(x);
    this.bd.presentAlert("usuario eliminado correctamente");
  }

}
