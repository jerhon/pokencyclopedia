import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, state, transition, animate, style, query } from '@angular/animations';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { filter, skipUntil, debounceTime } from 'rxjs/operators';
import { TdLoadingService } from '@covalent/core/loading';
import { Subject } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { nsend } from 'q';

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
  searchChange = new Subject();


  public constructor(
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

    // if the page navigates away and there is no longer a search,
    // then hide the search box
    this._router.events.pipe(
      filter((evt)=>evt instanceof NavigationStart)
    ).subscribe((evt) => {
      if (evt instanceof NavigationStart) {
        if ((evt as NavigationStart).url.indexOf('search=') < 0) {
          this.searchVisible = false;
        }
      }
    })
    
    this._activatedRoute.data.subscribe((dat) => {
      console.log('activated route data', dat);
      this.searchEnabled = dat.search;
    });

    this.searchChange.pipe(
        debounceTime(250))
      .subscribe((search) => {
        let queryParams: any = {};

        if (search) {
          queryParams.search = search;
        }

        this._router.navigate(['/pokemon'], { queryParams });         
      });
  }

  onSearch(value:string) {
    this.searchChange.next(value);
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }
}

