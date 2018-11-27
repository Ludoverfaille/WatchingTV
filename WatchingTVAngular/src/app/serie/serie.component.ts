import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SerieService} from './serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {
  seriePopulaire:any;

  constructor(private router: ActivatedRoute, private serieService: SerieService) {

  }

  ngOnInit() {
    this.serieService.getSeriePopulaire().subscribe(data=>{this.seriePopulaire = data['results'];})
  }
}
