import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Utilisateur} from '../utilisateur';
import {UtilisateurService} from '../utilisateur.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  private _utilisateurs:Utilisateur[] = [];
  private _subQueryUtilisateur: Subscription;
  private _utilisateurTmp: Utilisateur = new Utilisateur();


  constructor(public utilisateurService:UtilisateurService, private router:Router) {

  }

  ngOnInit() {
  }

  login(){
    this.getUtilisateurs();
    for(let u of this._utilisateurs){
      if(u.username == this._utilisateurTmp.username){
        if(u.password == this._utilisateurTmp.password){
          this.utilisateurService.setLoggedIn(u);
          localStorage.setItem('utilisateur', String(u.id));
          this.router.navigate(['accueil']);
        }
      }
    }
  }

  getUtilisateurs(){
    this._subQueryUtilisateur = this.utilisateurService
      .query()
      .subscribe(utilisateurs=>
        this._utilisateurs = utilisateurs.map(utilisateur=>new Utilisateur().fromJson(utilisateur))
      );
  }


  get utilisateurTmp(): Utilisateur {
    return this._utilisateurTmp;
  }

  set utilisateurTmp(value: Utilisateur) {
    this._utilisateurTmp = value;
  }
}
