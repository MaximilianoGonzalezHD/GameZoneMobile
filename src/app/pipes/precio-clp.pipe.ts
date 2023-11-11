import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioClp'
})
export class PrecioClpPipe implements PipeTransform {

  transform(valor: number): string {
    const factorConversion = 1; // Factor de conversión (valor ejemplo)
    const precioCLp = valor * factorConversion;
    return `$${precioCLp.toFixed(0)} CLP`;
  }

}









