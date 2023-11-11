import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared.module';
import { JuegosNintendoPageRoutingModule } from './juegos-nintendo-routing.module';

import { JuegosNintendoPage } from './juegos-nintendo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosNintendoPageRoutingModule,
    SharedModule
  ],
  declarations: [JuegosNintendoPage,],
})
export class JuegosNintendoPageModule {}
