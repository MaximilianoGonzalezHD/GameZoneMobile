import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvideContrasenaPage } from './olvide-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: OlvideContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvideContrasenaPageRoutingModule {}
