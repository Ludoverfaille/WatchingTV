import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Utilisateur} from '../utilisateur';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  private _utilisateurTmp: Utilisateur = new Utilisateur;
  private _utilisateurCreated:EventEmitter<Utilisateur> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get utilisateurTmp(): Utilisateur {
    return this._utilisateurTmp;
  }

  createUtilisateur() {
    this._utilisateurCreated.next(this.utilisateurTmp);
    this.reset();
  }

  reset(){
    this._utilisateurTmp = new Utilisateur;
  }

  @Output()
  get utilisateurCreated(): EventEmitter<Utilisateur>{
    return this._utilisateurCreated;
  }
}
