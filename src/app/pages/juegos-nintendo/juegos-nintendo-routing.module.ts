import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosNintendoPage } from './juegos-nintendo.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosNintendoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosNintendoPageRoutingModule {}
