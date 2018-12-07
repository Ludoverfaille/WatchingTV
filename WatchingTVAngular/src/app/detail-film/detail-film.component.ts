import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilmService} from '../film/film.service';
import {AuthguardGuard} from '../authguard.guard';
import {Favori} from '../favori/favori';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.css']
})
export class DetailFilmComponent implements OnInit {
  film:any;

  private _favoriTmp: Favori = new Favori;
  private _favoriCreated:EventEmitter<Favori> = new EventEmitter();

  constructor(public router:ActivatedRoute,private filmService:FilmService, public authguard:AuthguardGuard) { }

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

  createFavori(){
    this._favoriCreated.next(this.favoriTmp);
    this.reset();
  }

  reset(){
    this._favoriTmp = new Favori;
  }

  @Output()
  get favoriCreated(): EventEmitter<Favori>{
    return this._favoriCreated;
  }



}
