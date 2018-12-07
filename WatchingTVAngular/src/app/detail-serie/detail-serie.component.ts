import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SerieService} from '../serie/serie.service';
import {AuthguardGuard} from '../authguard.guard';

@Component({
  selector: 'app-detail-serie',
  templateUrl: './detail-serie.component.html',
  styleUrls: ['./detail-serie.component.css']
})
export class DetailSerieComponent implements OnInit {
  serie:any;

  constructor(public router:ActivatedRoute,private serieService:SerieService, public authguard:AuthguardGuard) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['serieID'];
      this.serieService.getSerie(id).subscribe(data => {
        this.serie = data;
      })
    })
  }



}
