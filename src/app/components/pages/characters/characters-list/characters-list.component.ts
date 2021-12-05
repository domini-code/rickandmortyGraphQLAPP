import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

import { DataService } from '@shared/services/data.service';
@Component({
  selector: 'app-characters-list',
  template: `
  <app-search></app-search>
  <section class="character__list"
    infiniteScroll
    (scrolled)="onScrollDown()"
  >
  <ng-container *ngIf="characters$ | async as characters; else showEmpty">
    <app-characters-card *ngFor="let character of characters" [character]="character"></app-characters-card>
  </ng-container>
   <ng-template #showEmpty>
    <div class="notResults">
      <h1 class="title">Not results</h1>
      <img src="assets/imgs/404.jpeg" alt="404" />
    </div>
   </ng-template>

    <button *ngIf="showButton" (click)="onScrollTop()" class="button">⬆️</button>
  </section>
`,
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  characters$ = this.dataSvc.characters$;
  showButton = false;

  private scrollHeight = 500;
  private pageNum = 1;
  constructor(@Inject(DOCUMENT) private document: Document,
    private dataSvc: DataService) { }


  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }


  onScrollDown(): void {
    this.pageNum++;
    this.dataSvc.getCharactersByPage(this.pageNum);
  }
}
