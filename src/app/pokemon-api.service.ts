import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , from, of } from 'rxjs';
import { tap, map, filter, flatMap, merge, mergeAll, toArray } from 'rxjs/operators'

export interface ListResult<T> {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
}

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface PokemonBasic {
  name: string;
  url: string;
}
export interface PokemonSprites {
  front_default: string;
}
export interface PokemonStats {
  stat: NamedApiResource;
  base_stat: number;
  effort: number;
}
export interface PokemonDetail {
  name: string;
  sprites: PokemonSprites;
  stats: PokemonStats[];

  moves: { move : PokemonMove  }[]
}
export interface PokemonActionBasic {

}

export interface PokemonMove {
  name :string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {


  constructor(private _client: HttpClient) { 
  }
  
  setCache(url: string, value: any) {
    localStorage.setItem(url, JSON.stringify(value));
  }

  clone<T>(obj: T) : T {
    return <T>Object.assign({}, obj);
  }

  get<T>(url: string) : Observable<T> {
    if (localStorage.getItem(url)) {
      console.log("Cache already has" , url);
      return of( this.clone(<T>JSON.parse(localStorage.getItem(url))) );
    }

    console.log("Requesting that pokemon!" , url);
    // get the value and cache
    return this._client.get<T>(url).pipe(
      tap( (val) => { try {
      this.setCache(url, val) } catch (err) {}} ) );
  }

  
  getAllPokemon() {
    return this.get<ListResult<PokemonBasic>>("https://pokeapi.co/api/v2/pokemon/?limit=2000").pipe(map((result) => 
        {
          result.results = result.results.sort((a, b) => a.name.localeCompare(b.name)) 
          return result;
        }));
  }

  searchPokemon(name: string) : Observable<ListResult<PokemonBasic>> {
    return this.getAllPokemon()
      .pipe( map((pl) => {
            pl.results = pl.results.filter(
              (pokemon) => pokemon.name.toLowerCase().indexOf(name.toLowerCase()) >= 0
            )
            return pl;
          }
        )
      );
  }

  getPokemonDetails(pokemons: PokemonBasic[]) : Observable<PokemonDetail[]> {
    return of(pokemons)
      .pipe(
        flatMap(
          (pb) => pb.map((p) => this.get<PokemonDetail>(p.url))
        ),
        mergeAll(),
        toArray()
      );
  }

  getPokemonDetailsByName(name:string) : Observable<PokemonDetail> {
    return this._client.get<PokemonDetail>("https://pokeapi.co/api/v2/pokemon/" + name);
  }

  getPokemonDetailsPage(search: string, start: number, size: number) : Observable<PokemonDetail[]> {
    let pokemon = search ? this.searchPokemon(search) : this.getAllPokemon();
    return pokemon.pipe(
      flatMap((r) => { 
        let pageItems = r.results.slice(start, Math.min(start + size - 1, r.results.length - 1));
        console.log(start, size, pageItems);
        return this.getPokemonDetails(pageItems);
      })
    );
  }

}
