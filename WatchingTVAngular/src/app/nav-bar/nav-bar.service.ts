import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  private film_url="https://api.themoviedb.org/3/"
  private api_key="bfb8d0b05e92cf528ef802c947b095b0";
  private recherche_string: string;

  constructor(public _http: HttpClient) {

  }

  rechercher(recherches: string){
    this.recherche_string = recherches;
    return this._http.get(this.film_url + 'search/multi?api_key=' + this.api_key+ '&query=' + this.recherche_string + '&language=fr');
  }
}
