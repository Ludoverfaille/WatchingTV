import { Component, OnInit } from '@angular/core';
import {Favori} from '../favori';
import {Subscription} from 'rxjs';
import {FavoriService} from '../favori.service';
import {ActivatedRoute} from '@angular/router';
import {Serie} from '../../serie/serie';
import {Film} from '../../film/film';
import {FilmService} from '../../film/film.service';
import {SerieService} from '../../serie/serie.service';

@Component({
  selector: 'app-gestion-favori',
  templateUrl: './gestion-favori.component.html',
  styleUrls: ['./gestion-favori.component.css']
})
export class GestionFavoriComponent implements OnInit {

  private _favoris:Favori[]=[];
  private _subQueryFavori:Subscription;
  private _favoriTmp: Favori = new Favori();

  private _films:Film[]=[];
  private _favFilms:Film[]=[];
  private _subQueryFilm: Subscription;

  private _series:Serie[]=[];
  private _favSeries:Serie[]=[];
  private _subQuerySerie: Subscription;

  constructor(public favoriService:FavoriService, public filmService:FilmService, public serieService:SerieService, private router: ActivatedRoute) { }

  ngOnInit(){
    this.getFavFilms();
    this.getFavSeries();
  }

  getFavFilms(){
    this.getFavoris();
    this.getFilms;
    for(let fav of this._favoris){
      if(fav.utilisateur == +localStorage.getItem("utilisateur")){
        for(let film of this._films){
          if(fav.element == film.id && fav.elementType == "film") {
            console.log("Film favori ajouté");
            this._favFilms.push(film);
          }
        }
      }
    }
  }

  getFavSeries(){
    this.getFavoris();
    this.getSeries();
    for(let fav of this._favoris){
      if(fav.utilisateur == +localStorage.getItem("utilisateur")){
        for(let serie of this._series){
          if(fav.element == serie.id && fav.elementType == "serie") {
            console.log("Serie favori ajouté");
            this._favSeries.push(serie);
          }
        }
      }
    }
  }

  getFavoris(){
    this._subQueryFavori = this.favoriService
      .query()
      .subscribe(favoris=>
      this._favoris = favoris.map(favoris=>new Favori().fromJson(favoris)));
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

  get favoriTmp(): Favori{
    return this._favoriTmp;
  }

  get favFilms(): Film[] {
    return this._favFilms;
  }

  get favSeries(): Serie[] {
    return this._favSeries;
  }
}