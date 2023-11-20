import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarContrasenaSegPage } from './cambiar-contrasena-seg.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarContrasenaSegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarContrasenaSegPageRoutingModule {}
