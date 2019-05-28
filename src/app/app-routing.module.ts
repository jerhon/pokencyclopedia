import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonSearchComponent } from './pokemon/pokemon-search/pokemon-search.component';
import { PokemonDetailsComponent } from './pokemon/pokemon-details/pokemon-details.component';
import { PokemonResolver } from './pokemon/pokemon-details/pokemon-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full'},
  { path: "pokemon", component: PokemonSearchComponent, pathMatch: 'full',  data: {search: true} },
  { path: "pokemon/:name", 
    component: PokemonDetailsComponent, 
    data: { search: false }, 
    resolve: { pokemonDetails: PokemonResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
