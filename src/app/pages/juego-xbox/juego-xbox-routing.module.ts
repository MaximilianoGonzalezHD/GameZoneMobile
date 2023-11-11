import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoXboxPage } from './juego-xbox.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoXboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoXboxPageRoutingModule {}
