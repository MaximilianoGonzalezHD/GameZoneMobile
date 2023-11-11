import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosPlayStationPageRoutingModule } from './juegos-play-station-routing.module';

import { JuegosPlayStationPage } from './juegos-play-station.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosPlayStationPageRoutingModule,
    SharedModule
  ],
  declarations: [JuegosPlayStationPage,]
})
export class JuegosPlayStationPageModule {}
