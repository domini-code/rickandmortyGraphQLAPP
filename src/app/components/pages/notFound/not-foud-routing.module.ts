import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoudComponent } from './not-foud.component';

const routes: Routes = [{ path: '', component: NotFoudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoudRoutingModule { }
