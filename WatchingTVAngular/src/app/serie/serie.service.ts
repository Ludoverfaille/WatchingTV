import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SerieService {

  private _serie_url = "https://api.themoviedb.org/3/";
  private _api_key = "bfb8d0b05e92cf528ef802c947b095b0";
  private _serie_string: string;

  constructor(public _http: HttpClient) { }

  rechercherSerie(serie:string){
    this._serie_string = serie;
    return this._http.get(this._serie_url + 'search/movie?query=' + this._serie_string + '&api_key=' + this._api_key+ '&language=fr');
  }

  getSerie(id:number){
    return this._http.get(this._serie_url + "serie/" + id + "?api_key=" + this._api_key + "&language=fr");
  }

  getSeriePopulaire(){
    return this._http.get(this._serie_url + 'discover/movie?sort_by=popularity.desc' + '&api_key=' + this._api_key+ '&language=fr');
  }
}
