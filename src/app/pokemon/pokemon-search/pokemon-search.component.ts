import { Component, OnInit } from '@angular/core';
import { PokemonDetail } from "../pokemon-api.service"
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PokemonSearchParams } from './pokemon-search.resolver';

export interface PokeListItem {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent {

  pokemonList: PokeListItem[] = [];

  query: PokemonSearchParams;
  readonly pageSize : number = 20;

  constructor(private _activatedRouter : ActivatedRoute, private _router : Router ) {
    _activatedRouter.data.subscribe((d ) => {
      this.pokemonList = (d.pokemonList as PokemonDetail[]).map((pd) => ({
        name: pd.name,
        imageUrl: pd.sprites.front_default
      }));
    });
    _activatedRouter.queryParams.subscribe((d : PokemonSearchParams) => {
      this.query = { 
        offset: d.offset ? +d.offset : 0,
        count: d.count ? +d.count : 20,
        search: d.search
      };
    });
  }

  nextPage() {
    var nextParams = {... this.query};
    if (this.pokemonList.length >= this.pageSize) {
      nextParams.offset = +nextParams.offset + this.pokemonList.length;
    }
    this.navigatePage(nextParams);
  }

  lastPage() {
    var nextParams = {... this.query};
    nextParams.offset -= +this.query.count;
    if (nextParams.offset < 0) {
      nextParams.offset = 0;
    }
    this.navigatePage(nextParams);
  }

  navigatePage(params : PokemonSearchParams) {
    if (params.offset == 0) {
      delete params.offset;
      delete params.count;
    }   

    this._router.navigate([], { queryParams: params });
  }

}
