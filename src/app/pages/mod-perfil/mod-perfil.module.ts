import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModPerfilPageRoutingModule } from './mod-perfil-routing.module';

import { ModPerfilPage } from './mod-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModPerfilPageRoutingModule
  ],
  declarations: [ModPerfilPage]
})
export class ModPerfilPageModule {}
