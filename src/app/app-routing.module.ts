import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'characters-list', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./components/pages/episodes/episodes.module').then(
        (m) => m.EpisodesModule
      ),
  },

  {
    path: 'characters-list',
    loadChildren: () =>
      import(
        './components/pages/characters/characters-list/characters-list.module'
      ).then((m) => m.CharactersListModule),
  },
  {
    path: 'characters-details/:id',
    loadChildren: () =>
      import(
        './components/pages/characters/characters-details/characters-details.module'
      ).then((m) => m.CharactersDetailsModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./components/pages/about/about.module').then(
        (m) => m.AboutModule
      ),
  },

  {
    path: '**',
    loadChildren: () =>
      import('./components/pages/notFound/not-foud.module').then(
        (m) => m.NotFoudModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
