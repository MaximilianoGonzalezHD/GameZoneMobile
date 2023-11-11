import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagaConfirmadoPage } from './paga-confirmado.page';

const routes: Routes = [
  {
    path: '',
    component: PagaConfirmadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagaConfirmadoPageRoutingModule {}
