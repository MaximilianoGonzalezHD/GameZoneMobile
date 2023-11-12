import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiuserPageRoutingModule } from './apiuser-routing.module';

import { ApiuserPage } from './apiuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiuserPageRoutingModule
  ],
  declarations: [ApiuserPage]
})
export class ApiuserPageModule {}
