import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class FilmService {
  private film_url="https://api.themoviedb.org/3/"
  private api_key="bfb8d0b05e92cf528ef802c947b095b0";
  private page_num:1;

  constructor(public _http: HttpClient) {

  }

  getFilm(id:number){
    return this._http.get(this.film_url + 'movie/' + id + '?api_key=' + this.api_key+ '&language=fr');
  }

  getFilmsPopulaire() {
    return this._http.get(this.film_url + 'discover/movie?sort_by=popularity.desc' + '&api_key=' + this.api_key+ '&language=fr&page='+this.page_num);
  }
}
