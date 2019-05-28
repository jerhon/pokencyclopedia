import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {CovalentVirtualScrollModule} from '@covalent/core/virtual-scroll';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';

import { MatButtonToggleModule } from '@angular/material/button-toggle';


import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'; 

import {CovalentLoadingModule} from '@covalent/core/loading'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PokemonModule } from './pokemon/pokemon.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,

    CovalentLoadingModule,

    ScrollDispatchModule,

    CovalentVirtualScrollModule,

    PokemonModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
