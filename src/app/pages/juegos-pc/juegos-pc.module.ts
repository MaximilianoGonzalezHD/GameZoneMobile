import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosPcPageRoutingModule } from './juegos-pc-routing.module';

import { JuegosPcPage } from './juegos-pc.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosPcPageRoutingModule,
    SharedModule
  ],
  declarations: [JuegosPcPage]
})
export class JuegosPcPageModule {}
