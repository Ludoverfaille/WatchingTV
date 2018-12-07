import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film} from './film';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class FilmService {
  private film_url="https://api.themoviedb.org/3/"
  private api_key="bfb8d0b05e92cf528ef802c947b095b0";
  private page_num:1;

  public static readonly URL_API_FILM:string="/api/film";

  constructor(public http: HttpClient) {

  }

  public query():Observable<Film[]>{
    return this.http.get<Film[]>(FilmService.URL_API_FILM);
  }

  public post(film:Film): Observable<Film>{
    return this.http.post<Film>(FilmService.URL_API_FILM, film.toJson());
  }

  public update(film:Film): Observable<any>{
    return this.http.put(FilmService.URL_API_FILM, film.toJson());
  }

  public delete(film:Film): Observable<any>{
    return this.http.delete<any>(FilmService.URL_API_FILM + "/" + film.id);
  }

  getFilm(id:number){
    return this.http.get(this.film_url + 'movie/' + id + '?api_key=' + this.api_key+ '&language=fr');
  }

  getFilmsPopulaire() {
    return this.http.get(this.film_url + 'discover/movie?sort_by=popularity.desc' + '&api_key=' + this.api_key+ '&language=fr&page='+this.page_num);
  }
}
