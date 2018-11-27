import { Component, OnInit } from '@angular/core';
import {FilmService} from '../film/film.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  filmPopulaire:any;
  film:any;
  recherches_result:any;
  resultat:any;

  constructor(public filmService: FilmService) {
  }

  rechercher() {
    this.filmService.rechercher(this.resultat).subscribe(data => {
      this.recherches_result = data['results'];
      console.log(data)

    });
  }

  ngOnInit() {
    this.filmService.getFilmsPopulaire().subscribe(data =>{
      this.filmPopulaire = data['results'];
    })
  }

}
