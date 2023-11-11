import { NgModule } from '@angular/core';
import { PrecioClpPipe } from './pipes/precio-clp.pipe';

@NgModule({
  declarations: [PrecioClpPipe],
  exports: [PrecioClpPipe],
})
export class SharedModule { }