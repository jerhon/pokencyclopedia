import { Component, OnInit } from '@angular/core';
import { PokemonApiService, PokemonBasic } from "../pokemon-api.service"

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {

  pokemonList: PokemonBasic[];

  constructor(private _api: PokemonApiService) { }

  ngOnInit() {
    this._api.getAllPokemon().subscribe(
      (p) => this.pokemonList = p.results
    );
  }

}
