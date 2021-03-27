import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersListRoutingModule } from './characters-list-routing.module';
import { CharactersListComponent } from './characters-list.component';
import { CharactersCardModule } from '@characters/characters-card/characters-card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [CharactersListComponent],
  imports: [
    CommonModule,
    CharactersListRoutingModule,
    CharactersCardModule,
    InfiniteScrollModule,
  ]
})
export class CharactersListModule { }
