import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Film} from '../film';
import {Utilisateur} from '../../utilisateur/utilisateur';
import {FilmService} from '../film.service';

@Component({
  selector: 'app-smart-manager-film',
  templateUrl: './smart-manager-film.component.html',
  styleUrls: ['./smart-manager-film.component.css']
})
export class SmartManagerFilmComponent implements OnInit, OnDestroy {


  private _films:Film[] = [];
  private _subQueryFilm: Subscription;
  private _subPostFilm: Subscription;

  constructor(public filmService:FilmService) { }

  ngOnInit() {
    this.getFilms()
  }

  ngOnDestroy(): void{
    if(this._subQueryFilm){
      this._subQueryFilm.unsubscribe();
    }
    if(this._subPostFilm){
      this._subPostFilm.unsubscribe();
    }
  }

  getFilms(){
    this._subQueryFilm = this.filmService
      .query()
      .subscribe(films=>
        this._films = films.map(film=>new Film().fromJson(film))
      );
  }

  postFilm(film:Film){
    this._subPostFilm=this.filmService.post(film).subscribe(newFilm => this.films.push(new Film().fromJson(newFilm)));
  }

  get films(): Film[]{
    return this._films;
  }

}
