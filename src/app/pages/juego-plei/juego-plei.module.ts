import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoPleiPageRoutingModule } from './juego-plei-routing.module';

import { JuegoPleiPage } from './juego-plei.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoPleiPageRoutingModule,
    SharedModule
  ],
  declarations: [JuegoPleiPage]
})
export class JuegoPleiPageModule {}
