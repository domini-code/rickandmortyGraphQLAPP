/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

import {
  find,
  mergeMap,
  pluck,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Episode, Character, DataResponse } from '../interfaces/data.interface';
import { LocalStorageService } from './localStorage.service';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  characters$ = this.charactersSubject.asObservable();
  constructor(
    private apollo: Apollo,
    private localStorageSvc: LocalStorageService
  ) {
    this.getDataApi();
  }

  //NOTE: Metodo para obtener los Personajes con el ID
  getDetails(id: number): any {
    return this.characters$.pipe(
      mergeMap((character: Character[]) => character),
      find((character: Character) => character?.id === id)
    );
  }

  getCharactersByPage(pageNum: number): any {
    const QUERY_BY_PAGE = gql`
      {
        characters (page: ${pageNum}) {
          results {
            id
            name
            status
            species
            gender
            image
          }
        }
      }
    `;
    this.apollo
      .watchQuery<any>({
        query: QUERY_BY_PAGE,
      })
      .valueChanges.pipe(
        take(1),
        pluck('data', 'characters'),
        withLatestFrom(this.characters$),
        tap(([apiResponse, characters]) => {
          //console.log({ apiResponse, characters });
          this.parseCharactersData([...characters, ...apiResponse.results]);
        })
      )
      .subscribe();
  }

  private getDataApi() {
    this.apollo
      .watchQuery<DataResponse>({
        query: QUERY,
      })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { episodes, characters } = data;
          this.charactersSubject.next(characters.results);
          this.episodesSubject.next(episodes.results);

          this.parseCharactersData(characters.results);
        })
      )
      .subscribe();
  }

  private parseCharactersData(characters: Character[]): void {
    const currentFavs = this.localStorageSvc.getFavoritesCharacters();

    const newData = characters.map((character) => {
      const found = !!currentFavs.find(
        (fav: Character) => fav.id === character.id
      );
      return { ...character, isFavorite: found };
    });
    this.charactersSubject.next(newData);
  }
}
