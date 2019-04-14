import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

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

  public constructor(protected _change : ChangeDetectorRef, protected _searchService : SearchService, private _activatedRoute : ActivatedRoute, private _router : Router) {}

  ngOnInit() {
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

