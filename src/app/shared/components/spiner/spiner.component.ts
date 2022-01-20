import { Component } from '@angular/core';
import { SpinnerService } from '@app/shared/services/spinner.service';

@Component({
  selector: 'app-spiner',
  template: `<div class="overlay" *ngIf="isLoading$ | async">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div> `,
  styleUrls: ['./spiner.component.scss'],
})
export class SpinerComponent {
  isLoading$ = this.spinnerSvc.isLoading$;

  constructor(private spinnerSvc: SpinnerService) {}
}
