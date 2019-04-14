import { Component, OnInit } from '@angular/core';
import { PokemonApiService, PokemonBasic, PokemonDetail } from "../pokemon-api.service"
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search.service';

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
  lastSearch: string;
  
  constructor(private _api: PokemonApiService, private _searchService : SearchService, private _router : Router, private _activatedRouter : ActivatedRoute ) {
    this.pokemonDetails = [];
    this.lastIdx = 0;
    this.pageSize = 10;
  }

  ngOnInit() {    
    this._searchService.getSearch().subscribe((search) => {
      this.refresh();
    });

    this._searchService.enableSearch();
  }

  refresh() {
    this.pokemonDetails = [];
    this._api.getPokemonDetailsPage(this._searchService.currentSearch, this.lastIdx, this.pageSize)
      .subscribe((r) => { 
        this.pokemonDetails = r.map((i) => ({ 
          name: i.name, 
          imageUrl: i.sprites.front_default
        }));
      });
  }

  nextPage() {
    this.lastIdx += this.pageSize;
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
