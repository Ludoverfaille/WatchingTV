import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Favori} from './favori';

@Injectable({
  providedIn: 'root'
})
export class FavoriService {

  public static readonly URL_API_FAVORI:string="/api/favori";

  constructor(public http:HttpClient) { }

  public query():Observable<Favori[]>{
    return this.http.get<Favori[]>(FavoriService.URL_API_FAVORI);
  }

  public post(favori:Favori): Observable<Favori>{
    return this.http.post<Favori>(FavoriService.URL_API_FAVORI, favori.toJson());
  }

  public update(favori:Favori): Observable<any>{
    return this.http.put(FavoriService.URL_API_FAVORI, favori.toJson());
  }

  public delete(favori:Favori): Observable<any>{
    return this.http.delete<any>(FavoriService.URL_API_FAVORI + "/" + favori.id);
  }

}
