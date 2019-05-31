import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { PokemonDetail, PokemonApiService, PokemonBasic } from '../pokemon-api.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import { delay } from 'rxjs/operators';

export interface PokemonSearchParams     {
    search?: string;
    offset?: number;
    count?: number;
}

@Injectable({
    providedIn: 'root'
})
export class PokemonSearchResolver implements Resolve<PokemonDetail[]> {

    constructor(private _pokemonService: PokemonApiService) {}

    readonly pageSize : number = 20;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PokemonDetail[]> {
        var { search, offset, count} = route.queryParams;
        console.log("RESOLVER: pokemon list", search, offset, count);

        offset = offset ? +offset : 0;
        count = count ? +count : this.pageSize;

        if (search) {
            search = search.replace(' ', '-');
        }
        
        return this._pokemonService.getPokemonDetailsPage(search, offset, count);
    }
}