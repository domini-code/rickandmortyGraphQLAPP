import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoudRoutingModule } from './not-foud-routing.module';
import { NotFoudComponent } from './not-foud.component';


@NgModule({
  declarations: [NotFoudComponent],
  imports: [
    CommonModule,
    NotFoudRoutingModule
  ]
})
export class NotFoudModule { }
