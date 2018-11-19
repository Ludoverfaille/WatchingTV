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
  rechercheFilm:any;

  constructor(public filmService: FilmService) {
    this.filmService.getFilmsPopulaire().subscribe(data =>{
      this.filmPopulaire = data['results'];
    })
  }

  rechercherFilm() {
    this.filmService.rechercherFilm(this.film).subscribe(data => {
      this.rechercheFilm = data['results'];

    });
  }

  ngOnInit() {
  }

}
