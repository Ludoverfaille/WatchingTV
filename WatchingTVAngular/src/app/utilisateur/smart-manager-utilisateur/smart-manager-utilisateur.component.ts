import {Component, OnDestroy, OnInit} from '@angular/core';
import {Utilisateur} from '../utilisateur';
import {Subscription} from 'rxjs';
import {UtilisateurService} from '../utilisateur.service';

@Component({
  selector: 'app-smart-manager-utilisateur',
  templateUrl: './smart-manager-utilisateur.component.html',
  styleUrls: ['./smart-manager-utilisateur.component.css']
})
export class SmartManagerUtilisateurComponent implements OnInit,OnDestroy {

  private _utilisateurs:Utilisateur[] = [];
  private _subQueryUtilisateur: Subscription;
  private _subPostUtilisateur: Subscription;

  constructor(public utilisateurService:UtilisateurService) { }

  ngOnInit() {
    this.getUtilisateurs();
  }

  ngOnDestroy(): void{
    if(this._subQueryUtilisateur){
      this._subQueryUtilisateur.unsubscribe();
    }
    if(this._subPostUtilisateur){
      this._subPostUtilisateur.unsubscribe();
    }
  }

  getUtilisateurs(){
    this._subQueryUtilisateur = this.utilisateurService
      .query()
      .subscribe(utilisateurs=>
      this._utilisateurs = utilisateurs.map(utilisateur=>new Utilisateur().fromJson(utilisateur))
      );
  }

  postUtilisateur(utilisateur:Utilisateur){
    this._subPostUtilisateur=this.utilisateurService.post(utilisateur).subscribe(newUtilisateur => this.utilisateurs.push(new Utilisateur().fromJson(newUtilisateur)));
  }

  get utilisateurs(): Utilisateur[]{
    return this._utilisateurs;
  }

}
