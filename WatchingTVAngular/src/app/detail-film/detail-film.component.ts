import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilmService} from '../film/film.service';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.component.html',
  styleUrls: ['./detail-film.component.css']
})
export class DetailFilmComponent implements OnInit {
  film:any;

  constructor(public router:ActivatedRoute,private filmService:FilmService) { }

  ngOnInit() {
    this.router.params.subscribe((params)=>{
      const id = params['filmID'];
      this.filmService.getFilm(id).subscribe(data =>{
        this.film = data;
      })
    })

  }

}
