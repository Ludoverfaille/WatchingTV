import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../utilisateur/utilisateur.service';
import {AuthguardGuard} from '../authguard.guard';
import {Film} from '../film/film';
import {Serie} from '../serie/serie';
import {Utilisateur} from '../utilisateur/utilisateur';
import {Favori} from '../favori/favori';
import {Commentaire} from '../commentaire/commentaire';
import {Subscription} from 'rxjs';
import {FilmService} from '../film/film.service';
import {SerieService} from '../serie/serie.service';
import {FavoriService} from '../favori/favori.service';
import {CommentaireService} from '../commentaire/commentaire.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  private _films:Film[] = [];
  private _subQueryFilm: Subscription;

  private _series:Serie[] = [];
  private _subQuerySerie: Subscription;

  private _utilisateurs:Utilisateur[] = [];
  private _subQueryUtilisateur: Subscription;

  private _favoris:Favori[] = [];
  private _subQueryFavori: Subscription;

  private _commentaires:Commentaire[] = [];
  private _subQueryCommentaire: Subscription;

  constructor(private utilisateur: UtilisateurService, public authGuard: AuthguardGuard, public filmService: FilmService, public serieService: SerieService, public utilisateurService:UtilisateurService, public favoriService:FavoriService, public commentaireService:CommentaireService) { }

  ngOnInit() {
    this.getFilms();
    this.getSeries();
    this.getUtilisateurs();
    this.getFavoris();
    this.getCommentaires();
  }

  getFilms(){
    this._subQueryFilm = this.filmService
      .query()
      .subscribe(films=>
        this._films = films.map(film=>new Film().fromJson(film))
      );
  }

  getSeries(){
    this._subQuerySerie = this.serieService
      .query()
      .subscribe(series=>
        this._series = series.map(serie=>new Serie().fromJson(serie))
      );
  }

  getUtilisateurs(){
    this._subQueryUtilisateur = this.utilisateurService
      .query()
      .subscribe(utilisateurs=>
        this._utilisateurs = utilisateurs.map(utilisateur=>new Utilisateur().fromJson(utilisateur))
      );
  }

  getFavoris(){
    this._subQueryFavori = this.favoriService
      .query()
      .subscribe(favoris=>
        this._favoris = favoris.map(favori=>new Favori().fromJson(favori))
      );
  }

  getCommentaires(){
    this._subQueryCommentaire = this.commentaireService
      .query()
      .subscribe(commentaires=>
        this._commentaires = commentaires.map(commentaire=>new Commentaire().fromJson(commentaire))
      );
  }

  get films(): Film[] {
    return this._films;
  }

  set films(value: Film[]) {
    this._films = value;
  }

  get series(): Serie[] {
    return this._series;
  }

  set series(value: Serie[]) {
    this._series = value;
  }

  get utilisateurs(): Utilisateur[] {
    return this._utilisateurs;
  }

  set utilisateurs(value: Utilisateur[]) {
    this._utilisateurs = value;
  }

  get favoris(): Favori[] {
    return this._favoris;
  }

  set favoris(value: Favori[]) {
    this._favoris = value;
  }

  get commentaires(): Commentaire[] {
    return this._commentaires;
  }

  set commentaires(value: Commentaire[]) {
    this._commentaires = value;
  }
}
