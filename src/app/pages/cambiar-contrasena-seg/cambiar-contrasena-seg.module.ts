import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContrasenaSegPageRoutingModule } from './cambiar-contrasena-seg-routing.module';

import { CambiarContrasenaSegPage } from './cambiar-contrasena-seg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarContrasenaSegPageRoutingModule
  ],
  declarations: [CambiarContrasenaSegPage]
})
export class CambiarContrasenaSegPageModule {}
