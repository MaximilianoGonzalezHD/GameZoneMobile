import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paga-confirmado',
  templateUrl: './paga-confirmado.page.html',
  styleUrls: ['./paga-confirmado.page.scss'],
})
export class PagaConfirmadoPage implements OnInit {
  compra: any;
  
  detalles: any;
  userId: string | null | number; 
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
    this.iniciarCargaDatos();
    this.bd.dbState().subscribe(async (res) => {
      if (res) {
        try {
          this.usuario_list = await this.bd.buscarUsuarioPorId(this.userId);
          console.log('Datos del usuario:', this.usuario_list);

        } catch (error) {
          console.error('Error al buscar el usuario o las compras:', error);
        }
      }
    });
  }

  confirmarcompra() {
    this.bd.presentAlert('Gracias por su compra!');
    this.router.navigate(['/home']);
  }

  async iniciarCargaDatos() {
    try {
      const compras = await this.bd.obtenerComprasPorUsuario(this.userId);
      if (compras.length > 0) {
        // Ordena las compras por fecha en orden descendente (la más reciente primero).
        compras.sort((a, b) => new Date(b.fechac).getTime() - new Date(a.fechac).getTime());
        this.compra = compras[0]; // La última compra es el primer elemento después de ordenar.
        console.log(this.compra);
      }
    } catch (error) {
      console.error('Error al obtener la última compra:', error);
    }
}}