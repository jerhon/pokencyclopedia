import { Pipe, PipeTransform } from '@angular/core';
import { namespaceHTML } from '@angular/core/src/render3';

@Pipe({
  name: 'pokemonName'
})
export class PokemonNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    
    var name = new String(value).replace('-', ' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
  }

}
