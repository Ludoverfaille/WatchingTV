import {AfterViewInit,Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Favori} from '../favori';
import {Subscription} from 'rxjs';
import {FavoriService} from '../favori.service';
import {ActivatedRoute} from '@angular/router';
import {Serie} from '../../serie/serie';
import {Film} from '../../film/film';
import {FilmService} from '../../film/film.service';
import {SerieService} from '../../serie/serie.service';
import {AuthguardGuard} from '../../authguard.guard';
import index from '@angular/cli/lib/cli';

@Component({
  selector: 'app-gestion-favori',
  templateUrl: './gestion-favori.component.html',
  styleUrls: ['./gestion-favori.component.css']
})
export class GestionFavoriComponent implements OnInit, AfterViewInit {

  private _favoris:Favori[]=[];
  private _subQueryFavori:Subscription;
  private _favoriTmp: Favori = new Favori();

  private _favoriDeleted:EventEmitter<Favori> = new EventEmitter()

  private _films:Film[]=[];
  private _favFilms:Film[]=[];
  private _subQueryFilm: Subscription;

  private _series:Serie[]=[];
  private _favSeries:Serie[]=[];
  private _subQuerySerie: Subscription;

  constructor(public favoriService:FavoriService, public filmService:FilmService, public serieService:SerieService, private router: ActivatedRoute, public authGuard: AuthguardGuard) {

  }

  ngOnInit(){
    this.getFavoris();
    this.getFavFilms();
    this.getFavSeries();
  }

  ngAfterViewInit(): void {

  }

  getFavFilms(){
    for(let favoriteFilm of this._favFilms){
      const indexToDelete=this
        .favoris
        .map(t=>t.id)
        .indexOf(favoriteFilm.id);

      if(indexToDelete == -1){
        return;
      }

      this._favFilms.splice(indexToDelete,1);
    }

    this.getFavoris();
    this.getFilms();
    for(let fav of this._favoris){
      if(fav.utilisateur == this.authGuard.getIdUtilisateur()){
        for(let film of this._films){
          if(fav.element == film.id && fav.elementType == "film") {
            console.log("Film"+film.title+" ajouté");
            this._favFilms.push(film);
          }
        }
      }
    }
  }

  getFavSeries(){
    for(let favoriteSerie of this._favSeries){
      const indexToDelete=this
        .favoris
        .map(t=>t.id)
        .indexOf(favoriteSerie.id);

      if(indexToDelete == -1){
        return;
      }

      this._favSeries.splice(indexToDelete,1);
    }

    this.getFavoris();
    this.getSeries();
    for(let fav of this._favoris){
      if(fav.utilisateur == this.authGuard.getIdUtilisateur()){
        for(let serie of this._series){
          if(fav.element == serie.id && fav.elementType == "serie") {
            console.log("Serie"+serie.title+"ajouté");
            this._favSeries.push(serie);
          }
        }
      }
    }
  }

  deleteFavori(id:Number,element:String) {
    if (confirm("Voullez vous vraiment le retirer des favoris?")) {
      for (let favori of this._favoris) {
        if (favori.elementType == element && favori.element == id && favori.utilisateur == this.authGuard.getIdUtilisateur()) {
          console.log(favori.id);
          this._favoriDeleted.next(favori);
        }
      }
    }
  }

  getFavoris(){
    console.log(this._subQueryFavori);
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

  get favoris(): Favori[] {
    return this._favoris;
  }

  @Input()
  set favoris(value: Favori[]) {
    this._favoris = value;
  }

  get films(): Film[] {
    return this._films;
  }

  get series(): Serie[] {
    return this._series;
  }

  getFilmApiId(id: number) {
    localStorage.setItem("film", String(id))
  }

  getSerieApiId(idSerie: number) {
    localStorage.setItem("serie", String(idSerie))
  }

  @Output()
  get favoriDeleted(): EventEmitter<Favori> {
    return this._favoriDeleted;
  }
}
