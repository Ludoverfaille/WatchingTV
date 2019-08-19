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

  private _isLoggedIn:boolean = false;
  private _idUtilisateurLogged:number;
  private _utilisateurLogged:Utilisateur;
  private _isAdminLogged:boolean;

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


  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  setLoggedIn(utilisateur: Utilisateur) {
    this._isLoggedIn = !this._isLoggedIn;
  }

  setIdUtilisateur(utilisateur: Utilisateur){
    this._idUtilisateurLogged = utilisateur.id;
  }

  setIsAdminUtilisateur(utilisateur: Utilisateur){
    this._isAdminLogged = utilisateur.isAdmin;
  }

  get idUtilisateurLogged(): number {
    return this._idUtilisateurLogged;
  }

  get utilisateurLogged(): Utilisateur {
    return this._utilisateurLogged;
  }

  get isAdminLogged(): boolean {
    return this._isAdminLogged;
  }

}
