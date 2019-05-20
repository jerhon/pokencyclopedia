import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { SearchService } from './search.service';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { filter, skipUntil } from 'rxjs/operators';
import { TdLoadingService } from '@covalent/core/loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('expansion', [
      state('closed, void', style({height: '0px', visibility: 'hidden'})),
      state('open', style({height: '*', visibility: 'visible'})),
      transition('open <=> closed, void => open',
        animate('175ms')),
    ])
  ]
})
export class AppComponent {
  
  searchVisible:boolean = false;
  searchEnabled:boolean = true;
  navigating:boolean = false;


  public constructor(
    protected _searchService : SearchService, 
    private _activatedRoute : ActivatedRoute, 
    private _router : Router,
    private _loadingService : TdLoadingService) {
      
  }

  ngOnInit() {
    this._router.events.pipe( 
      filter((evt) => evt instanceof NavigationEnd || evt instanceof NavigationStart || evt instanceof NavigationError)
    ).subscribe((evt) => {
      if (evt instanceof NavigationStart) {
        this.navigating = true;
      } else if (evt instanceof NavigationEnd) {
        this.navigating = false;
      } else if (evt instanceof NavigationError) {
        this.navigating = false;
      }
    });
    
    this._activatedRoute.data.subscribe((dat) => {
      console.log('activated route data', dat);
      this.searchEnabled = dat.search;
    });
  }

  set search(value: string) {
    if (value != this._searchService.currentSearch) {
      this._searchService.submitSearch(value);
      this._router.navigate(['/pokemon']);
    }
  }
  get search() : string {
    return this._searchService.currentSearch;
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
    
    // clear the search
    if (!this.searchVisible) {
      this._searchService.submitSearch('');
    }
  }
}

