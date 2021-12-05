import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';

import { DataService } from '@shared/services/data.service';
import { Character } from '@app/shared/interfaces/data.interface';
@Component({
  selector: 'app-characters-details',
  template: `
  <section class="character__details">
  <app-characters-card *ngIf="character$ |async as character" [character]="character"></app-characters-card>
</section>`,
  styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent implements OnInit {
  characterId: string;
  character$: Observable<any>;
  constructor(private route: ActivatedRoute, private dataSvc: DataService) {

    this.route.params.pipe(
      take(1),
      tap(({ id }) => this.character$ = this.dataSvc.getDetails(id))
    ).subscribe();
  }

  ngOnInit(): void {
  }

}
