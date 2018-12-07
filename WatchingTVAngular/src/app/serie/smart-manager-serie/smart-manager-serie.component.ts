import {Component, OnDestroy, OnInit} from '@angular/core';
import {Serie} from '../serie';
import {Subscription} from 'rxjs';
import {SerieService} from '../serie.service';

@Component({
  selector: 'app-smart-manager-serie',
  templateUrl: './smart-manager-serie.component.html',
  styleUrls: ['./smart-manager-serie.component.css']
})
export class SmartManagerSerieComponent implements OnInit, OnDestroy{

  private _series:Serie[] = [];
  private _subQuerySerie: Subscription;
  private _subPostSerie: Subscription;

  constructor(public serieService:SerieService) { }

  ngOnInit(){
    this.getSeries();
  }


  ngOnDestroy(): void{
    if(this._subQuerySerie){
      this._subQuerySerie.unsubscribe();
    }
    if(this._subPostSerie){
      this._subPostSerie.unsubscribe();
    }
  }

  getSeries(){
    this._subQuerySerie = this.serieService
      .query()
      .subscribe(series=>
        this._series = series.map(serie=>new Serie().fromJson(serie))
      );
  }

  postSerie(serie:Serie){
    this._subPostSerie=this.serieService.post(serie).subscribe(newSerie => this.series.push(new Serie().fromJson(newSerie)));
  }

  get series(): Serie[]{
    return this._series;
  }

}
