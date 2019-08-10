import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilmService} from '../film/film.service';
import {AuthguardGuard} from '../authguard.guard';
import {Favori} from '../favori/favori';
import {Film} from '../film/film';
import {BroadcastFavoriCreateService} from '../broadcast-favori-create.service';
import {FavoriService} from '../favori/favori.service';
import {Serie} from '../serie/serie';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.css']
})
export class DetailFilmComponent implements OnInit {
  film:any;

  private _filmTmp: Film = new Film;
  private _filmCreated:EventEmitter<Film> = new EventEmitter();
  private _films:Film[] = [];
  private _subQueryFilm: Subscription;

  private _favoriTmp: Favori = new Favori;
  private _favoriCreated:EventEmitter<Favori> = new EventEmitter();

  constructor(public router:ActivatedRoute,private filmService:FilmService,private favoriService:FavoriService, public authguard:AuthguardGuard, public broadcastFavoriCreated:BroadcastFavoriCreateService) { }

  ngOnInit() {
    this.router.params.subscribe((params)=>{
      const id = params['filmID'];
      this.filmService.getFilm(id).subscribe(data =>{
        this.film = data;
      })
    })
  }

  get favoriTmp(): Favori{
    return this._favoriTmp;
  }

  get filmTmp(): Film{
    return this._filmTmp;
  }

  createFavori(){
    this._filmTmp = this.filmIsPresent();
    if(this.filmTmp.title == ""){
      this.filmTmp.title = this.film.title;
      this.filmTmp.overwiew=this.film.overview;
      this.filmTmp.releaseDate=this.film.release_date;
      this.filmTmp.voteAverage=this.film.vote_average;
      this.filmTmp.posterLink="https://image.tmdb.org/t/p/w500/"+this.film.poster_path;

      this.filmService.post(this.filmTmp).subscribe(newFilm => {
        this.favoriTmp.element=newFilm.id;
        this.favoriTmp.elementType="film";
        this.favoriTmp.utilisateur=+localStorage.getItem("utilisateur");
        this.favoriService.post(this.favoriTmp).subscribe();
      });
    }
    else{
      this.favoriTmp.element=this._filmTmp.id;
      this.favoriTmp.elementType="film";
      this.favoriTmp.utilisateur=+localStorage.getItem("utilisateur");
      this.favoriService.post(this.favoriTmp).subscribe();
    }

    this._favoriCreated.next(this.favoriTmp);

    // this.broadcastFavoriCreated.sendFavori(this._favoriTmp);

    this.reset();
  }

  getFilms(){
    this._subQueryFilm = this.filmService
      .query()
      .subscribe(films=>
        this._films = films.map(film=>new Film().fromJson(film))
      );
  }

  reset(){
    this._filmTmp = new Film;
    this._favoriTmp = new Favori;
  }

  @Output()
  get favoriCreated(): EventEmitter<Favori>{
    return this._favoriCreated;
  }

  @Output()
  get filmCreated(): EventEmitter<Film>{
    return this._filmCreated;
  }

  filmIsPresent(){
    this.getFilms();
    for(let f of this._films){
      if(f.title == this.film.title){
        console.log("La série est déja présente");
        return f;
      }
    }
    return new Film;
  }
}
