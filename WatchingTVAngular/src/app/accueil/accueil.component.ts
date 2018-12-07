import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../utilisateur/utilisateur.service';
import {AuthguardGuard} from '../authguard.guard';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {



  constructor(private utilisateur: UtilisateurService, public authGuard: AuthguardGuard) { }

  ngOnInit() {
  }
}
