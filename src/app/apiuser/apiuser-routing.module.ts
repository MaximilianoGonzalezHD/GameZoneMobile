import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiuserPage } from './apiuser.page';

const routes: Routes = [
  {
    path: '',
    component: ApiuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiuserPageRoutingModule {}
