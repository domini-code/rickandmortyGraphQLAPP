import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersDetailsRoutingModule } from './characters-details-routing.module';
import { CharactersDetailsComponent } from './characters-details.component';
import { CharactersCardModule } from '../characters-card/characters-card.module';

@NgModule({
  declarations: [CharactersDetailsComponent],
  imports: [CommonModule, CharactersDetailsRoutingModule, CharactersCardModule],
})
export class CharactersDetailsModule {}
