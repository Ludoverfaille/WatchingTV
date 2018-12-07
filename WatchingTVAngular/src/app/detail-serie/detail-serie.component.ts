import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SerieService} from '../serie/serie.service';
import {AuthguardGuard} from '../authguard.guard';
import {Serie} from '../serie/serie';
import {Favori} from '../favori/favori';
import {FavoriService} from '../favori/favori.service';
import {BroadcastFavoriCreateService} from '../broadcast-favori-create.service';

@Component({
  selector: 'app-detail-serie',
  templateUrl: './detail-serie.component.html',
  styleUrls: ['./detail-serie.component.css']
})
export class DetailSerieComponent implements OnInit {
  serie:any;

  private _serieTmp: Serie = new Serie;
  private _serieCreated:EventEmitter<Serie> = new EventEmitter();

  private _favoriTmp: Favori = new Favori;
  private _favoriCreated:EventEmitter<Favori> = new EventEmitter();

  constructor(public router:ActivatedRoute,private serieService:SerieService,private favoriService:FavoriService, public authguard:AuthguardGuard, public broadcastFavoriCreated:BroadcastFavoriCreateService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['serieID'];
      this.serieService.getSerie(id).subscribe(data => {
        this.serie = data;
      })
    })
  }

  get favoriTmp(): Favori{
    return this._favoriTmp;
  }

  get serieTmp(): Serie{
    return this._serieTmp;
  }

  createFavori(){
    if(!this.serieIsPresent())
    this.serieTmp.title = this.serie.title;
    this.serieTmp.overwiew = this.serie.overview;
    this.serieTmp.season = this.serie.number_of_seasons;
    this.serieTmp.season = this.serie.number_of_episodes;
    this.serieTmp.status = this.serie.status;
    this.serieTmp.releaseDate = this.serie.first_air_date;
    this.serieTmp.voteAverage = this.serie.vote_average;
    this.serieTmp.posterLink = "https://image.tmdb.org/t/p/w500/"+this.serie.poster_path;

    this.serieService.post(this.serieTmp).subscribe(newSerie => {
      this.favoriTmp.element=newSerie.id;
      this.favoriTmp.elementType="serie";
      this.favoriTmp.utilisateur=+localStorage.getItem("utilisateur");
      this.favoriService.post(this.favoriTmp).subscribe();
    });
    this.broadcastFavoriCreated.sendFavori(this._favoriTmp);

    this.reset();
  }

  reset(){
    this._serieTmp = new Serie;
    this._favoriTmp = new Favori;
  }

  @Output()
  get favoriCreated(): EventEmitter<Favori>{
    return this._favoriCreated;
  }

  @Output()
  get serieCreated():EventEmitter<Serie>{
    return this._serieCreated;
  }

  serieIsPresent(){
    return true;
  }

}
