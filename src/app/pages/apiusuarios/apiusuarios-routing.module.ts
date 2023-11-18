import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiusuariosPage } from './apiusuarios.page';

const routes: Routes = [
  {
    path: '',
    component: ApiusuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiusuariosPageRoutingModule {}
