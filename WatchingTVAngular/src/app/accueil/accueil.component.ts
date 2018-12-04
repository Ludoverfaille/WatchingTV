import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../utilisateur/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {



  constructor(private utilisateur: UtilisateurService) { }

  ngOnInit() {
  }
}
