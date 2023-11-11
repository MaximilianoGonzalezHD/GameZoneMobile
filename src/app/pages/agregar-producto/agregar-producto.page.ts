import { Component, OnInit } from '@angular/core';
import { DbservicioService } from '../../services/dbservicio.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  id_juego = "";
  nombre = "";
  descripcion = "";
  precio = "";
  imagen: any;
  seccion = "";
  slug = "";




  constructor(
    private bd: DbservicioService,
    public router: Router,
 
  ) {
   
 
  }

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });

    this.imagen = image.dataUrl;
  }

  insertar() {
    if (this.nombre.length < 3 || this.nombre.length > 20) {
      this.bd.presentAlert('El nombre del juego debe tener entre 3 y 20 caracteres.');
      return; 
    }
  
    const parsedPrice = parseFloat(this.precio);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      this.bd.presentAlert('El precio debe ser un número positivo.');
      return; 
    }
    const zero = parseFloat(this.precio);
    if (isNaN(parsedPrice) || zero == 0) {
      this.bd.presentAlert('El precio no puede ser 0');
      return; 
    }
    if (this.nombre.trim() === '') {
      this.bd.presentAlert('El nombre del juego no puede ser solo espacios en blanco.');
      return; 
    }
 
    if (this.descripcion.length < 10 || this.descripcion.length > 500) {
      this.bd.presentAlert('La descripción debe tener entre 10 y 500 caracteres.');
      return; 
    }
    if (!this.nombre) {
      this.bd.presentAlert('¿El juego no tiene nombre?');
      return; 
    }
    if (!this.precio) {
      this.bd.presentAlert('Falta el precio');
      return; 
    }
    if (!this.descripcion) {
      this.bd.presentAlert('Falta La Descripción');
      return; 
    }

    if (!this.seccion) {
      this.bd.presentAlert('Debes seleccionar una sección.');
      return; 
    }
    if (!this.imagen) {
      this.bd.presentAlert('Debes seleccionar una imagen.');
      return; 
    }


    this.slug = this.generateSlug(this.nombre);
    this.bd.insertarJuego(this.nombre, this.descripcion, this.precio, this.imagen, this.seccion, this.slug);
    this.bd.presentAlert('Juego Agregado!');
    this.router.navigate(['/lista-videojuegos']);
  }



  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}