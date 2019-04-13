import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path:"", component: PokemonSearchComponent },
  { path: "pokemon/:name", component: PokemonDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
