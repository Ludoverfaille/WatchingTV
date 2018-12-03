import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavBarService} from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-recherche-resultat',
  templateUrl: './recherche-resultat.component.html',
  styleUrls: ['./recherche-resultat.component.css']
})
export class RechercheResultatComponent implements OnInit {
  recherche_result:any;

  constructor(public router:ActivatedRoute,private navBarService:NavBarService) { }

  ngOnInit() {
    this.router.params.subscribe((params)=>{
      const string_re = params['result'];
      this.navBarService.rechercher(string_re).subscribe(data =>{
        this.recherche_result = data['results'];
      })
    })
  }

}
