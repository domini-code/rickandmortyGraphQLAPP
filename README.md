# RickandmortyGraphQL

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Creando Modulos con Angular CLI donde se puede crear un modulo con una ruta

ng g m components/pages/home/home -m=app --route home --flat

ng g m shared/components/header

ng g c shared/components/header

ng g m components/pages/episodes/episodes -m=app --route episodes --flat

ng g m components/pages/notFound/notFoud -m=app --route not

ng g m components/pages/characters/characters-card

ng g c components/pages/characters/characters-card

ng g m components/pages/characters/characters-list -m=app --route characters-list

ng g m components/pages/characters/characters-details -m=app --route characters-details

ng g m components/pages/about/about -m=app --route about

ng g m shared/components/spiner

ng g c shared/components/spiner

## Alias de las rutas o paths

ojo revisar el archivo tsconfig.json las "paths"

## Corregir error con [routerLink]="['/characters-list']"

Hay que importar en el modulo de header el RouterModule, con esto queremos decir que donde se utilice asi [routerLink]="['/characters-list']" hay que importarlo en el modulo que corresponda

## Creando Servicios

ng g s shared/services/data --skipTests=true


## Modulo de Angular Universal

ng add @nguniversal/express-engine

<https://docs.angular.lat/guide/universal>
