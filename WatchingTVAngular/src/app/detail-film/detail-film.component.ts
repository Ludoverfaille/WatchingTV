import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilmService} from '../film/film.service';
import {AuthguardGuard} from '../authguard.guard';
import {Favori} from '../favori/favori';
import {Film} from '../film/film';
import {BroadcastFavoriCreateService} from '../broadcast-favori-create.service';
import {FavoriService} from '../favori/favori.service';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.css']
})
export class DetailFilmComponent implements OnInit {
  film:any;

  private _filmTmp: Film = new Film;
  private _filmCreated:EventEmitter<Film> = new EventEmitter();

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

  createFavori(elementType:String){
    this.filmTmp.id = this.film.id;
    this.filmTmp.title=this.film.title;
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

    this.broadcastFavoriCreated.sendFavori(this._favoriTmp);

    this.reset();
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
}
