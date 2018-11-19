import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilmService} from './film.service';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film:any;
  filmPopulaire:any;

  constructor(private router: ActivatedRoute, private filmService: FilmService){
    this.filmService.getFilmsPopulaire().subscribe(data =>{
      this.filmPopulaire = data['results'];
    })

  }

  ngOnInit() {
      this.router.params.subscribe((params)=>{
        const id = params['filmID'];
        this.filmService.getFilm(id).subscribe(data=>{
          this.film=data;
        })
      })

  }


}
