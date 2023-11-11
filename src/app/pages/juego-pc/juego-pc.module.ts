import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoPcPageRoutingModule } from './juego-pc-routing.module';

import { JuegoPcPage } from './juego-pc.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoPcPageRoutingModule,
    SharedModule
  ],
  declarations: [JuegoPcPage]
})
export class JuegoPcPageModule {}
