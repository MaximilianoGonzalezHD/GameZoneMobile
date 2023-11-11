import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbservicioService } from '../../services/dbservicio.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.page.html',
  styleUrls: ['./lista-usuario.page.scss'],
})
export class ListaUsuarioPage implements OnInit {
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
  eliminar(x: any){
    this.bd.borrarUsuario(x);
    this.bd.presentAlert("usuario eliminado correctamente");
  }

}
