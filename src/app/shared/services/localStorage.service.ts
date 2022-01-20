/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../interfaces/data.interface';

const MY_FAVORITES = 'myFavorites';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  //TODO:Averiguar bien de BehaviorSubject
  private charactersFavSubject = new BehaviorSubject<Character[]>(null);

  charactersFavSubject$ = this.charactersFavSubject.asObservable();

  constructor(private toastrSvc: ToastrService) {
    this.initialStorage();
  }

  //NOTE:Metodo para donde llama a los metodos de agregar y eliminar de favoritos
  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentsFav = this.getFavoritesCharacters();
    const found = !!currentsFav.find((fav: Character) => fav.id === id);

    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  //NOTE:Metodo para agregar un personaje a favoritos
  private addToFavorite(character: Character): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      localStorage.setItem(
        MY_FAVORITES,
        JSON.stringify([...currentsFav, character])
      );
      this.charactersFavSubject.next([...currentsFav, character]);

      this.toastrSvc.success(
        `${character.name} agregado a favoritos`,
        'RickAndMortyApp'
      );
    } catch (error) {
      console.log(`Error agregando a favoritos: ${error}`);
      //TODO:Agregar un toast
      this.toastrSvc.error(
        `Error agregando a favoritos ${error}`,
        'RickAndMortyApp'
      );
    }
  }

  //NOTE:Metodo para eliminar un personaje de favoritos
  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      const characters = currentsFav.filter(
        (character: Character) => character.id !== id
      );
      this.charactersFavSubject.next([...characters]);

      this.toastrSvc.warning(`Eliminado de favoritos`, 'RickAndMortyApp');
    } catch (error) {
      console.log(`Error eliminando de favoritos: ${error}`);
      //TODO:Agregar un toast
      this.toastrSvc.error(
        `Error agregando a favoritos ${error}`,
        'RickAndMortyApp'
      );
    }
  }

  //NOTE:Metodo para obtener un personaje favorito con observables
  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES));

      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.log(`Error obteniendo favoritos del localstorage: ${error}`);
    }
  }

  //NOTE:Metodo para borrar datos del localStorage
  arStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log(`Error limpiando el localstorage: ${error}`);
    }
  }

  //NOTE:Metodo para inicializar el localStorage
  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesCharacters();
  }
}
