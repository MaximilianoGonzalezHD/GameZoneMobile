import { Component, OnInit } from '@angular/core';
import { DbservicioService } from '../../services/dbservicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-mod-producto',
  templateUrl: './mod-producto.page.html',
  styleUrls: ['./mod-producto.page.scss'],
})
export class ModProductoPage implements OnInit {
  id_juego = "";
  nombre = "";
  descripcion = "";
  precio = "";
  imagen: any;
  seccion = "";
  slug = "";

  constructor(private bd: DbservicioService, private router: Router, private activatedrouter: ActivatedRoute, ) {
    



      this.activatedrouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras?.state){
      this.id_juego = this.router.getCurrentNavigation()?.extras?.state?.['id_juegoenviado'];
      this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombrevenviado'];
      this.descripcion = this.router.getCurrentNavigation()?.extras?.state?.['descripcionenviado'];
      this.precio = this.router.getCurrentNavigation()?.extras?.state?.['precioenviado'];
      this.imagen = this.router.getCurrentNavigation()?.extras?.state?.['imagenvenviado'];
      this.seccion = this.router.getCurrentNavigation()?.extras?.state?.['seccion_idenviado'];
      this.slug = this.router.getCurrentNavigation()?.extras?.state?.['slugenviado'];
      }
    })
   }

  ngOnInit() {
  }
  editar() {
    const errores: string[] = [];
  
    // Validaciones
    if (this.nombre.length < 3 || this.nombre.length > 20) {
      errores.push('El nombre del juego debe tener entre 3 y 20 caracteres.');
    }
  
    const parsedPrice = parseFloat(this.precio);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      errores.push('El precio debe ser un número positivo mayor que 0.');
    }
  
    if (this.nombre.trim() === '') {
      errores.push('El nombre del juego no puede ser solo espacios en blanco.');
    }
  
    if (this.descripcion.length < 10 || this.descripcion.length > 500) {
      errores.push('La descripción debe tener entre 10 y 500 caracteres.');
    }
  
    if (!this.seccion) {
      errores.push('Debes seleccionar una sección.');
    }
  
    if (!this.imagen) {
      errores.push('Debes seleccionar una imagen.');
    }
  
    // Mostrar errores si los hay
    if (errores.length > 0) {
      this.bd.presentAlert(errores.join('\n'));
      return;
    }
  
    // Actualizar el juego
    this.slug = this.generateSlug(this.nombre);
    this.bd.actualizarJuego(this.id_juego, this.nombre, this.descripcion, this.precio, this.imagen, this.seccion,this.slug);
    this.bd.presentAlert('VideoJuego Actualizado');
    this.router.navigate(['/lista-videojuegos']);
  }
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

async takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Photos, 
  });

  this.imagen = image.dataUrl;
}
}
