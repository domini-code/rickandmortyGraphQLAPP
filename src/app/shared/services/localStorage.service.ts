/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@shared/interfaces/data.interface';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = 'myFavorites';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>(null);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor(private toastrSvc: ToastrService) {
    this.initialStorage();
  }

  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentsFav = this.getFavoritesCharacters();
    const found = !!currentsFav.find((fav: Character) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, character]));
      this.charactersFavSubject.next([...currentsFav, character]);
      this.toastrSvc.success(`${character.name} added to favorite`, 'RickAndMortyAPP');
    } catch (error) {
      console.log('Error saving localStorage', error);
      this.toastrSvc.error(`Error saving localStorage ${error} `, 'RickAndMortyAPP');
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      const characters = currentsFav.filter(item => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters]);
      this.toastrSvc.warning(`Removed from favorite`, 'RickAndMortyAPP');
    } catch (error) {
      console.log('Error removing localStorage', error);
      this.toastrSvc.error(`Error removing localStorage ${error} `, 'RickAndMortyAPP');
    }

  }

  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.log('Error getting favorites from localStorage', error);
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log('Error cleaning localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesCharacters();
  }
}
