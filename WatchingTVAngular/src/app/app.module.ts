import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import {RouterModule, Routes} from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FilmComponent } from './film/film.component';
import { SerieComponent } from './serie/serie.component';

const routes:Routes =[
  {
    path: "accueil", component : AccueilComponent,pathMatch:"full"
  },
  {
    path: "connexion", component:ConnexionComponent
  },
  {
    path: "inscription", component:InscriptionComponent
  },
  {
    path: "film", component:FilmComponent
  },
  {
    path: "série", component:SerieComponent
  }

]


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ConnexionComponent,
    InscriptionComponent,
    NavBarComponent,
    FilmComponent,
    SerieComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
