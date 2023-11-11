import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosXboxPage } from './juegos-xbox.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosXboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosXboxPageRoutingModule {}
