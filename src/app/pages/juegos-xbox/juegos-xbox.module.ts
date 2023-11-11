import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosXboxPageRoutingModule } from './juegos-xbox-routing.module';

import { JuegosXboxPage } from './juegos-xbox.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosXboxPageRoutingModule,
    SharedModule
  ],
  declarations: [JuegosXboxPage]
})
export class JuegosXboxPageModule {}
