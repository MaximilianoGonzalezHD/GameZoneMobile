import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaUsuarioPageRoutingModule } from './lista-usuario-routing.module';

import { ListaUsuarioPage } from './lista-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaUsuarioPageRoutingModule
  ],
  declarations: [ListaUsuarioPage]
})
export class ListaUsuarioPageModule {}
