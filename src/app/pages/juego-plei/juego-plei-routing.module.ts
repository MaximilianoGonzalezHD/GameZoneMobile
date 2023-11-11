import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoPleiPage } from './juego-plei.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoPleiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoPleiPageRoutingModule {}
