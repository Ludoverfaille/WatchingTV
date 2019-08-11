import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {UtilisateurService} from './utilisateur/utilisateur.service';
import {Utilisateur} from './utilisateur/utilisateur';
import {Favori} from './favori/favori';
import {FavoriService} from './favori/favori.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private utilisateur: UtilisateurService){}

  // UTILISATEURS

  canActivate(
    next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.utilisateur.isLoggedIn;
  }

  getIdUtilisateur(): number {
    return this.utilisateur.idUtilisateurLogged;
  }

  changeLog(utilisateur : Utilisateur): Observable<boolean> | Promise<boolean> | void {
    return this.utilisateur.setLoggedIn(utilisateur);
  }

  getUtilisateurLogged(): Utilisateur {
    return this.utilisateur.utilisateurLogged;
  }

}

