import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiperfilPageRoutingModule } from './apiperfil-routing.module';

import { ApiperfilPage } from './apiperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiperfilPageRoutingModule
  ],
  declarations: [ApiperfilPage]
})
export class ApiperfilPageModule {}
