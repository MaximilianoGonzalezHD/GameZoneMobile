import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoPcPage } from './juego-pc.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoPcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoPcPageRoutingModule {}
