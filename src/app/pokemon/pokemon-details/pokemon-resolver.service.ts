import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { PokemonDetail, PokemonApiService } from '../pokemon-api.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PokemonResolver implements Resolve<PokemonDetail> {

    constructor(private _pokemonService: PokemonApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PokemonDetail> {
        // TODO: add error handling here
        var pokemonId = route.params.name;
        return this._pokemonService.getPokemonDetailsByName(pokemonId);
    }


}