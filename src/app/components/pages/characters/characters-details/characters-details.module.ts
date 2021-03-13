import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersDetailsRoutingModule } from './characters-details-routing.module';
import { CharactersDetailsComponent } from './characters-details.component';


@NgModule({
  declarations: [CharactersDetailsComponent],
  imports: [
    CommonModule,
    CharactersDetailsRoutingModule
  ]
})
export class CharactersDetailsModule { }
