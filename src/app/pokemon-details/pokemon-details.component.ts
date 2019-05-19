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

  constructor(private route:ActivatedRoute, 
    private pokemonApi: PokemonApiService, 
    private searchService : SearchService) {
  }

  ngOnInit() {
    console.log('route: ', this.route.snapshot.params);

    this.pokemonApi
      .getPokemonDetailsByName(this.route.snapshot.paramMap.get('name'))
      .subscribe((pd) => { 
        this.pokemonDetails = pd; 
        this.moves = this.pokemonDetails.moves.map((m) => m.move.name ).sort();
      });
  }

}
