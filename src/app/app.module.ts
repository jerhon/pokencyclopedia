import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { HttpClientModule } from '@angular/common/http';
import {CovalentVirtualScrollModule} from '@covalent/core/virtual-scroll';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';


import {ScrollDispatchModule} from '@angular/cdk/scrolling'; 

@NgModule({
  declarations: [
    AppComponent,
    PokemonSearchComponent
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

    ScrollDispatchModule,

    CovalentVirtualScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
