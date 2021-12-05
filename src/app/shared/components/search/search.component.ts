import { DataService } from '@shared/services/data.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
  <section class="search__container">
  <div class="search__name">
    <label for="searchName"> Search by name....</label>
    <input type="text" class="search__input" placeholder="Search by name...." [formControl]="search">
    <button (click)="onClear()">Clear</button>
  </div>
  </section>`,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {
  search = new FormControl('');
  private destroy$ = new Subject<unknown>();

  constructor(private dataSvc: DataService) {
    this.onSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


  onClear(): void {
    this.search.reset();
    this.dataSvc.getDataAPI();
  }

  private onSearch(): void {
    this.search.valueChanges.pipe(
      map(search => search?.toLowerCase().trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search !== '' && search?.length > 2),
      tap(search => this.dataSvc.filterData(search)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
