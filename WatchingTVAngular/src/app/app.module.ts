import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './utilisateur/connexion/connexion.component';
import {RouterModule, Routes} from '@angular/router';
import { InscriptionComponent } from './utilisateur/inscription/inscription.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FilmComponent } from './film/film.component';
import { SerieComponent } from './serie/serie.component';
import {FilmService} from './film/film.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SerieService} from './serie/serie.service';
import { DetailFilmComponent } from './detail-film/detail-film.component';
import { DetailSerieComponent } from './detail-serie/detail-serie.component';
import { SmartManagerUtilisateurComponent } from './utilisateur/smart-manager-utilisateur/smart-manager-utilisateur.component';




const routes:Routes =[
  {
    path: "accueil", component : AccueilComponent,pathMatch:"full"
  },
  {
    path: "connexion", component:ConnexionComponent
  },
  {
    path: "inscription", component:SmartManagerUtilisateurComponent
  },
  {
    path: "film", component:FilmComponent
  },
  {
    path: "série", component:SerieComponent
  },
  {
    path: "detail-film/:filmID", component:DetailFilmComponent
  },
  {
    path: "detail-serie/:serieID", component:DetailSerieComponent
  },


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
    DetailFilmComponent,
    DetailSerieComponent,
    SmartManagerUtilisateurComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [FilmService,SerieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
