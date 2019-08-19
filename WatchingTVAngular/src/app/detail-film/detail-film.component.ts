import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmService} from '../film/film.service';
import {AuthguardGuard} from '../authguard.guard';
import {Favori} from '../favori/favori';
import {Film} from '../film/film';
import {FavoriService} from '../favori/favori.service';
import {Observable, Subscription} from 'rxjs';
import {Commentaire} from '../commentaire/commentaire';
import {CommentaireService} from '../commentaire/commentaire.service';

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

  private _favoris : Favori[] = [];
  private _favoriTmp: Favori = new Favori;
  private _subQueryFavori: Subscription;
  private _favoriCreated:EventEmitter<Favori> = new EventEmitter();

  private _commentaireTmp: Commentaire = new Commentaire();
  private _subQueryCommentaire: Subscription;
  private _commentaires:Commentaire[] = [];
  private _commentairesFilm:Commentaire[] = [];
  private _commentaireCreated:EventEmitter<Commentaire> = new EventEmitter();

  constructor(public router:ActivatedRoute,private filmService:FilmService,private favoriService:FavoriService,private commentaireService:CommentaireService, public authguard:AuthguardGuard, public route:Router) { }

  ngOnInit() {
    this.router.params.subscribe((params)=>{
      const id = params['filmID'];
      this.filmService.getFilm(id).subscribe(data =>{
        this.film = data;
      })
    })
    this.getFavoris();
    this.getCommentaires();
    this.getCommentairesFilm();
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
      this.filmTmp.idFilm = this.film.id;
      this.filmTmp.title = this.film.title;
      this.filmTmp.overwiew=this.film.overview;
      this.filmTmp.releaseDate=this.film.release_date;
      this.filmTmp.voteAverage=this.film.vote_average;
      this.filmTmp.posterLink="https://image.tmdb.org/t/p/w500/"+this.film.poster_path;

      this.filmService.post(this.filmTmp).subscribe(newFilm => {
        this.favoriTmp.idAPI= this.film.id;
        this.favoriTmp.element=newFilm.id;
        this.favoriTmp.elementType="film";
        this.favoriTmp.utilisateur=+localStorage.getItem("utilisateur");
        this.favoriService.post(this.favoriTmp).subscribe();
      });
    }
    else{
      this.favoriTmp.idAPI= this.film.id;
      this.favoriTmp.element=this._filmTmp.id;
      this.favoriTmp.elementType="film";
      this.favoriTmp.utilisateur=+localStorage.getItem("utilisateur");
      this.favoriService.post(this.favoriTmp).subscribe();
    }

    this._favoriCreated.next(this.favoriTmp);

    this.reset();

    this.route.navigate(['accueil']);
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
    this._commentaireTmp = new Commentaire;
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
        console.log("La film est déja présente");
        return f;
      }
    }
    return new Film;
  }

  getFavoris(){
    console.log(this._subQueryFavori);
    this._subQueryFavori = this.favoriService
      .query()
      .subscribe(favoris=>
        this._favoris = favoris.map(favoris=>new Favori().fromJson(favoris)));
  }

  isFavori():boolean{
    for(let favori of this._favoris){
      if(favori.utilisateur == this.authguard.getIdUtilisateur() && favori.idAPI == this.film.id){
        this._favoriTmp.id = favori.id;
        return true;
      }
    }
    return false;
  }

  createCommentaire(){
    this._commentaireTmp.idFavori = this._favoriTmp.id;
    console.log(this.commentaireTmp.idFavori);
    this.commentaireService.post(this._commentaireTmp).subscribe();
    this._commentaireCreated.next(this._commentaireTmp);
    this._commentairesFilm.push(this._commentaireTmp);
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

  getCommentairesFilm(){
    if(this._commentairesFilm.length == 0){
      for(let commentaire of this._commentaires){
        for(let favori of this._favoris){
          if(commentaire.idFavori == favori.id && favori.idAPI == this.film.id){
            this._commentairesFilm.push(commentaire);
          }
        }
      }
    }
  }

  get commentairesFilm(): Commentaire[] {
    return this._commentairesFilm;
  }
}
