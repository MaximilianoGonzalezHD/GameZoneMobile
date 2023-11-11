import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModPerfilPage } from './mod-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: ModPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModPerfilPageRoutingModule {}
