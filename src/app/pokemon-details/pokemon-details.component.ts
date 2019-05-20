import { Component, OnInit } from '@angular/core';
import { PokemonApiService, PokemonDetail } from '../pokemon-api.service';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemonDetails : PokemonDetail;
  moves: string[];

  constructor(private route:ActivatedRoute) {
    this.setPokemonDetails(route.snapshot.data.pokemonDetails);
  }

  ngOnInit() {
    
  }

  setPokemonDetails(details : PokemonDetail) {
    this.pokemonDetails = details;
    this.moves = details.moves.map((m) => m.move.name).sort();
  }

}
