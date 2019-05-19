import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchEnabled: boolean;
  currentSearch: string;
  search: BehaviorSubject<string>;

  constructor() {
    this.currentSearch = '';
    this.search = new BehaviorSubject<string>('');
  }

  onSearch() : Observable<string> {
    return this.search;
  }
  getCurrentSearch() : string {
    return this.currentSearch;
  }
  submitSearch(search : string) {
    this.currentSearch = search;
    this.search.next(search);
  }
  

  enableSearch() {
    this.searchEnabled = true;
  }
  disableSearch() {
    this.searchEnabled = false;
    this.submitSearch('');
  }
  isSearchEnabled() {
    return this.searchEnabled;
  }
}
