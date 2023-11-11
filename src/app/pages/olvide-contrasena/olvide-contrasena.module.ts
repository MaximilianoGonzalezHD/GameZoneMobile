import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvideContrasenaPageRoutingModule } from './olvide-contrasena-routing.module';

import { OlvideContrasenaPage } from './olvide-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvideContrasenaPageRoutingModule
  ],
  declarations: [OlvideContrasenaPage]
})
export class OlvideContrasenaPageModule {}
