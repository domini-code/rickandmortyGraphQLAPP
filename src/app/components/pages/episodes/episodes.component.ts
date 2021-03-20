import { Component, } from '@angular/core';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-episodes',
  template: `
  <section class="container">
  <ul class="episodes__list">
    <li *ngFor="let episode of episodes$ | async ">
      {{ episode.episode}}- {{episode.name}}
    </li>
  </ul>
  </section>`,
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent {
  episodes$ = this.dataSvc.episodes$;
  constructor(private dataSvc: DataService) { }

}
