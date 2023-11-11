import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosPcPage } from './juegos-pc.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosPcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosPcPageRoutingModule {}
