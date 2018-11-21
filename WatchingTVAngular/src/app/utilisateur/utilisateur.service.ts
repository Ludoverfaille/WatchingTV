import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Utilisateur} from "./utilisateur";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public static readonly URL_API_UTILISATEUR:string="/api/utilisateur";

  constructor(public http:HttpClient) { }

  public query():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(UtilisateurService.URL_API_UTILISATEUR);
  }

  public post(utilisateur:Utilisateur): Observable<Utilisateur>{
    return this.http.post<Utilisateur>(UtilisateurService.URL_API_UTILISATEUR, utilisateur.toJson());
  }

  public update(utilisateur:Utilisateur): Observable<any>{
    return this.http.put(UtilisateurService.URL_API_UTILISATEUR, utilisateur.toJson());
  }

  public delete(utilisateur:Utilisateur): Observable<any>{
    return this.http.delete<any>(UtilisateurService.URL_API_UTILISATEUR + "/" + utilisateur.id);
  }
}
