import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { DbTransaction } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbservicioService } from '../../services/dbservicio.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup 
  
  idusuario: any = "";
  correou: any = "";
  nombreu: any = "";
  rutu: any = "";
  contrau: any = "";
  nombreuop: any = "";
  rol: any = "1";
  

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private db: DbservicioService,
    private toastController: ToastController,
    public alertController: AlertController) {
      this.formularioRegistro = this.fb.group({
        'nombre': [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)
          ]
        ],
        'NombreOpcional': [
          '',
          [
            firstUppercase,
            Validators.minLength(2),
            Validators.maxLength(15)
          ]
        ],
        'correo': [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        'rut': [
          '',
          [
            Validators.required,
            validarDV,
            validarFormatoRut
          ]
        ],
        'password': [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9  !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~€£¥₩])(?=.*?[A-Z 0-9]).{8,}$")
          ]
        ],
        'confirmacionPassword': [
          '',
          [
            Validators.required,
            passwordMatchValidator
          ]
        ]
      });
  }

  ngOnInit() {
  }

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    } else  {
      this.db.agregarUsuario(this.correou,this.nombreu,this.contrau,this.nombreuop,this.rol);
      const toast = await this.toastController.create({
        message: 'Registrado Correctamente',
        duration: 1500,
        position: 'bottom',
      });
      await toast.present()
      this.router.navigateByUrl("/login");
    }
  }
} 


  export function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmacionPassword');

  if (!password || !confirmPassword) {
    return null; 
  }

  if (password.value !== confirmPassword.value) {
    return { passwordMatch: true }; 
  }

  return null; 
}

 function firstUppercase(control: FormControl) {
  const value = control.value;
  if (value && value.length > 0) {
    const firstLetter = value.charAt(0);
    if (firstLetter !== firstLetter.toUpperCase()) {
      return { firstUppercase: true };
    }
  }
  return null;
  
}

export const validarFormatoRut = (rut: string) => {
  const validRegex = /^([0-9]{1,3}(\.[0-9]{3})*|[0-9]{1,3}(,[0-9]{3})*|[0-9]+)-(k|K|[0-9])$/;
  return validRegex.test(rut);
};

export const validarDV = (rut: string) => {
  const validRegex = /^(k|K|[0-9])$/;
  return validRegex.test(rut);
};

