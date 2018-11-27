import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SerieService {

  private _serie_url = "https://api.themoviedb.org/3/";
  private _api_key = "bfb8d0b05e92cf528ef802c947b095b0";

  constructor(public _http: HttpClient) { }


  getSerie(id:number){
    return this._http.get(this._serie_url + "tv/" + id + "?api_key=" + this._api_key + "&language=fr");
  }

  getSeriePopulaire(){
    return this._http.get(this._serie_url + 'discover/tv?sort_by=popularity.desc' + '&api_key=' + this._api_key+ '&language=fr');
  }
}
