import { Component, OnInit } from '@angular/core';
import { PokemonApiService, PokemonBasic, PokemonDetail } from "../pokemon-api.service"
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';


export interface PokeListItem {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {

  pokemonDetails: PokeListItem[];
  lastIdx: number;
  pageSize: number;

  constructor(private _api: PokemonApiService) {
    this.pokemonDetails = [];
    this.lastIdx = 0;
    this.pageSize = 10;
  }

  ngOnInit() {    
    this.refresh();
  }

  refresh() {
    this.pokemonDetails = [];
    this._api.getPokemonDetailsPage(this._search, this.lastIdx, this.pageSize)
      .subscribe((r) => this.pokemonDetails.push({ name: r.name, imageUrl: r.sprites.front_default}));
  }

  _search:string;
  get search() : string {
    return this._search;
  }
  set search(value:string) {
    this.pokemonDetails = [];
    this.lastIdx = 0;
    this._search = value;
    this.refresh();
  }

  nextPage() {
    this.lastIdx += this.pageSize;
    console.log(this.lastIdx, 'nextPage()');
    this.refresh();
  }
  lastPage() {
    this.lastIdx-=this.pageSize;
    if (this.lastIdx < 0) {
      this.lastIdx = 0;
    }
    this.refresh();
  }


}
