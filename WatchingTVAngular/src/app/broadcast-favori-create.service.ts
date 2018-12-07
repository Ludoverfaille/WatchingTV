import { Injectable } from '@angular/core';
import {Favori} from './favori/favori';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BroadcastFavoriCreateService {

  private favoriCreatedSubject: BehaviorSubject<Favori> = new BehaviorSubject(null);
  //public favoriCreated$: Observable<Favori> = this.favoriCreatedSubject.asObservable().pipe(filter(favori=>!!favori));

  constructor() { }

  public sendFavori(favori:Favori){
    this.favoriCreatedSubject.next(favori);
  }
}
