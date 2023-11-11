import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoXboxPageRoutingModule } from './juego-xbox-routing.module';

import { JuegoXboxPage } from './juego-xbox.page';
import { SharedModule } from '../../shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoXboxPageRoutingModule,
    SharedModule
  ],
  declarations: [JuegoXboxPage]
})
export class JuegoXboxPageModule {}
