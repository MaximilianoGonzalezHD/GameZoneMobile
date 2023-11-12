import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiperfilPage } from './apiperfil.page';

const routes: Routes = [
  {
    path: '',
    component: ApiperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiperfilPageRoutingModule {}
