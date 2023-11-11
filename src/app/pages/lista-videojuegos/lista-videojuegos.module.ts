import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared.module';
import { ListaVideojuegosPageRoutingModule } from './lista-videojuegos-routing.module';
import { ListaVideojuegosPage } from './lista-videojuegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaVideojuegosPageRoutingModule,
    SharedModule
  ],
  declarations: [ListaVideojuegosPage]
})
export class ListaVideojuegosPageModule {}
