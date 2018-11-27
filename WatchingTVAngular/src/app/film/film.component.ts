import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilmService} from './film.service';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  filmPopulaire:any;

  constructor(private router: ActivatedRoute, private filmService: FilmService){
  }

  ngOnInit() {
    this.filmService.getFilmsPopulaire().subscribe(data =>{
      this.filmPopulaire = data['results'];
    })

  }






}
