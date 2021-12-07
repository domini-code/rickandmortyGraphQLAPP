import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';

@Component({
  selector: 'app-characters-list',
  template: `<section
    class="character__list"
    infiniteScroll
    (scrolled)="onScrollDown()"
  >
    <app-characters-card
      *ngFor="let character of characters$ | async"
      [character]="character"
    ></app-characters-card>
    <button *ngIf="showButtons" (click)="onScrollTop()" class="button">
      ⬆️
    </button>
  </section>`,

  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {
  characters$ = this.dataService.characters$;
  showButtons = false;

  private pageNum = 1;

  private scrollHeight = 500;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dataService: DataService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButtons = (yOffset || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  onScrollDown(): void {
    this.pageNum++;
    this.dataService.getCharactersByPage(this.pageNum);
    //console.log('scrolled!!');
  }
}
