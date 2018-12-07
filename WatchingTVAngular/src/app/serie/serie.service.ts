import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Serie} from './serie';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SerieService {

  private _serie_url = "https://api.themoviedb.org/3/";
  private _api_key = "bfb8d0b05e92cf528ef802c947b095b0";

  public static readonly URL_API_SERIE:string="/api/serie";

  constructor(public http: HttpClient) { }

  public query():Observable<Serie[]>{
    return this.http.get<Serie[]>(SerieService.URL_API_SERIE);
  }

  public post(serie:Serie): Observable<Serie>{
    return this.http.post<Serie>(SerieService.URL_API_SERIE, serie.toJson());
  }

  getSerie(id:number){
    return this.http.get(this._serie_url + "tv/" + id + "?api_key=" + this._api_key + "&language=fr");
  }

  getSeriePopulaire(){
    return this.http.get(this._serie_url + 'discover/tv?sort_by=popularity.desc' + '&api_key=' + this._api_key+ '&language=fr');
  }

}
