import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SerieService} from '../serie/serie.service';
import {AuthguardGuard} from '../authguard.guard';
import {Serie} from '../serie/serie';
import {Favori} from '../favori/favori';
import {FavoriService} from '../favori/favori.service';
import {BroadcastFavoriCreateService} from '../broadcast-favori-create.service';
import {Subscription} from 'rxjs';
import {CommentaireService} from '../commentaire/commentaire.service';
import {Commentaire} from '../commentaire/commentaire';
import {Utilisateur} from '../utilisateur/utilisateur';

@Component({
  selector: 'app-detail-serie',
  templateUrl: './detail-serie.component.html',
  styleUrls: ['./detail-serie.component.css']
})
export class DetailSerieComponent implements OnInit {
  serie:any;

  private _serieTmp: Serie = new Serie;
  private _serieCreated:EventEmitter<Serie> = new EventEmitter();
  private _series:Serie[] = [];
  private _subQuerySerie: Subscription;

  private _favoris: Favori[] = [];
  private _favoriTmp: Favori = new Favori;
  private _subQueryFavori: Subscription;
  private _favoriCreated:EventEmitter<Favori> = new EventEmitter();

  private _commentaireTmp: Commentaire = new Commentaire();
  private _subQueryCommentaire: Subscription;
  private _commentaires:Commentaire[] = [];
  private _commentairesSerie:Commentaire[] = [];
  private _commentaireCreated:EventEmitter<Commentaire> = new EventEmitter();

  constructor(public router:ActivatedRoute,private serieService:SerieService,private favoriService:FavoriService,private commentaireService:CommentaireService, public authguard:AuthguardGuard,  public route:Router) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['serieID'];
      this.serieService.getSerie(id).subscribe(data => {
        this.serie = data;
      })
    })
    this.getFavoris();
    this.getCommentaires();
    this.getCommentairesSerie();
  }

  get favoriTmp(): Favori{
    return this._favoriTmp;
  }

  get serieTmp(): Serie{
    return this._serieTmp;
  }

  createFavori(){
    this._serieTmp = this.serieIsPresent();
    if(this.serieTmp.title == "") {
      this.serieTmp.idSerie = this.serie.id;
      this.serieTmp.title = this.serie.name;
      this.serieTmp.overwiew = this.serie.overview;
      this.serieTmp.season = this.serie.number_of_seasons;
      this.serieTmp.episode = this.serie.number_of_episodes;
      this.serieTmp.status = this.serie.status;
      this.serieTmp.releaseDate = this.serie.first_air_date;
      this.serieTmp.voteAverage = this.serie.vote_average;
      this.serieTmp.posterLink = "https://image.tmdb.org/t/p/w500/" + this.serie.poster_path;

      this.serieService.post(this.serieTmp).subscribe(newSerie => {
        this.favoriTmp.idAPI = this.serie.id;
        this.favoriTmp.element = newSerie.id;
        this.favoriTmp.elementType = "serie";
        this.favoriTmp.utilisateur = +localStorage.getItem("utilisateur");
        this.favoriService.post(this.favoriTmp).subscribe();
      });
    }
    else{
      this.favoriTmp.idAPI = this.serie.id;
      this.favoriTmp.element = this._serieTmp.id;
      this.favoriTmp.elementType = "serie";
      this.favoriTmp.utilisateur = +localStorage.getItem("utilisateur");
      this.favoriService.post(this.favoriTmp).subscribe();
    }

    this._favoriCreated.next(this.favoriTmp);

    this.reset();

    this.route.navigate(['accueil']);
  }

  getSeries(){
    this._subQuerySerie = this.serieService
      .query()
      .subscribe(series=>
        this._series = series.map(serie=>new Serie().fromJson(serie))
      );
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
    this.getSeries();
    for(let s of this._series){
      if(s.title == this.serie.name){
        console.log("La série est déja présente");
        return s;
      }
    }
    return new Serie;
  }

  getFavoris(){
    this._subQueryFavori = this.favoriService
      .query()
      .subscribe(favoris=>
        this._favoris = favoris.map(favori=>new Favori().fromJson(favori))
      );
  }

  isFavori():boolean{
    for(let favori of this._favoris){
      if(favori.utilisateur == this.authguard.getIdUtilisateur() && favori.idAPI == this.serie.id){
        this._favoriTmp.id = favori.id;
        return true;
      }
    }
    return false;
  }

  createCommentaire(){
    this._commentaireTmp.idFavori = this._favoriTmp.id;
    console.log(this._favoriTmp.id,this._commentaireTmp.idFavori);
    this.commentaireService.post(this._commentaireTmp).subscribe();
    this._commentaireCreated.next(this._commentaireTmp);
    this._commentairesSerie.push(this._commentaireTmp);
    this.reset();
  }

  get commentaireTmp(): Commentaire {
    return this._commentaireTmp;
  }

  set commentaireTmp(value: Commentaire) {
    this._commentaireTmp = value;
  }

  @Output()
  get commentaireCreated(): EventEmitter<Commentaire> {
    return this._commentaireCreated;
  }

  getCommentaires(){
    this._subQueryCommentaire = this.commentaireService
      .query()
      .subscribe(commentaires=>
        this._commentaires = commentaires.map(commentaire=>new Commentaire().fromJson(commentaire))
      );
  }

  getCommentairesSerie(){
    if(this._commentairesSerie.length == 0){
      for(let commentaire of this._commentaires){
        for(let favori of this._favoris){
          if(commentaire.idFavori == favori.id && favori.idAPI == this.serie.id){
            this._commentairesSerie.push(commentaire);
          }
        }
      }
    }
  }


  get commentairesSerie(): Commentaire[] {
    return this._commentairesSerie;
  }
}
