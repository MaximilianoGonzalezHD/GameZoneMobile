import { Component, OnInit } from '@angular/core';
import { DbservicioService } from '../../services/dbservicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FormBuilder } from '@angular/forms';
import { ValidatorFn,  FormGroup, Validators } from '@angular/forms';

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

  form: FormGroup;
  constructor(private bd: DbservicioService, private router: Router, private activatedrouter: ActivatedRoute, 
    private formBuilder: FormBuilder) {
    
      this.form = this.formBuilder.group({
        nombre: ['', Validators.compose([Validators.required])],
        descripcion: ['', Validators.compose([Validators.required])],
        precio: ['', Validators.compose([Validators.required])],
        seccion: ['', Validators.required],
      });


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
editar(){
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
  if (!this.form.valid) {
    this.bd.presentAlert('Error en el formulario: Debe ingresar todos los datos');
  }

  if (!this.seccion) {
    this.bd.presentAlert('Debes seleccionar una sección.');
    return; 
  }
  if (!this.imagen) {
    this.bd.presentAlert('Debes seleccionar una imagen.');
    return; 
  }
  
  this.bd.actualizarJuego(this.id_juego,this.nombre,this.descripcion,this.precio,this.imagen)
  this.bd.presentAlert("VideoJuego Actualizado");
  this.router.navigate(['/lista-videojuegos'])
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
