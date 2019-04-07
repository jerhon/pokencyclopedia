import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators'

export interface ListResult<T> {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
}

export interface PokemonBasic {
  name: string;
  url: string;
}


@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  _cache : { [key:string] : any };
  

  constructor(private _client: HttpClient) { 
    this._cache = {};
  }
  
  setCache(url: string, value: any) {
    this._cache[url] = value;
  }

  getCached<T>(url: string) : Observable<T> {
    if (url in this._cache) {
      console.log("Cache already has" , url);
      return Observable.create( <T>this._cache[url] );
    }

    console.log("Requesting that pokemon!" , url);
    // get the value and cache
    return this._client.get<T>("https://pokeapi.co/api/v2/" + url).pipe(
      tap( (val) => this.setCache(url, val) ) );
  }
  
  getAllPokemon() {
    return this.getCached<ListResult<PokemonBasic>>("pokemon/?limit=2000");
  }

  searchPokemon(name: string) {
    return this.getAllPokemon()
      .pipe( map((pokemonList) =>
          pokemonList.results.filter(
            (pokemon) => pokemon.name.toLowerCase().indexOf(name.toLowerCase()) != -1
          )
      )
    );
  }

}
