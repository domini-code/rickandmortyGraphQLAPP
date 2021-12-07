import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/shared/services/localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

charactersFav$=this.localStorageSvc.charactersFavSubject$;

  constructor(private localStorageSvc: LocalStorageService) {}

  ngOnInit(): void {}
}
