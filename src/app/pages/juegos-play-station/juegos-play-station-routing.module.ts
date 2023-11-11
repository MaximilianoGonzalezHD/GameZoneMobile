import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosPlayStationPage } from './juegos-play-station.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosPlayStationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosPlayStationPageRoutingModule {}
