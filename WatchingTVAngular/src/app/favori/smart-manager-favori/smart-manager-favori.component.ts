import {Component, OnDestroy, OnInit} from '@angular/core';
import {FavoriService} from '../favori.service';
import {Favori} from '../favori';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-smart-manager-favori',
  templateUrl: './smart-manager-favori.component.html',
  styleUrls: ['./smart-manager-favori.component.css']
})
export class SmartManagerFavoriComponent implements OnInit, OnDestroy {

  private _favoris:Favori[] = [];
  private _subQueryFavori: Subscription;
  private _subPostFavori: Subscription;
  private _subUpdateFavori: Subscription;
  private _subDeleteFavori: Subscription;

  constructor(public favoriService:FavoriService) { }

  ngOnInit() {
    this.getFavoris();
  }

  ngOnDestroy(): void{
    if(this._subQueryFavori){
      this._subQueryFavori.unsubscribe();
    }
    if(this._subQueryFavori){
      this._subPostFavori.unsubscribe();
    }
    if(this._subDeleteFavori){
      this._subDeleteFavori.unsubscribe();
    }
  }

  getFavoris(){
    this._subQueryFavori = this.favoriService
      .query()
      .subscribe(favoris=>
      this._favoris = favoris.map(favori=>new Favori().fromJson(favori)))
  }

  postFavori(favori:Favori){
    this._subPostFavori=this.favoriService.post(favori).subscribe(newFavori => this.favoris.push(new Favori().fromJson(newFavori)));
  }


  get favoris(): Favori[] {
    return this._favoris;
  }

  updateTodo(favori:Favori){
    this._subUpdateFavori = this.favoriService
      .update(favori)
      .subscribe(()=>console.log("OK"),
        ()=>console.log("Problème update"));
  }

  deleteFavori(favori:Favori){
    this.favoriService
      .delete(favori)
      .subscribe(
        ()=>this.deleteFavoriFromArray(favori));
  }

  deleteFavoriFromArray(favori:Favori){
    const indexToDelete=this
      .favoris
      .map(t=>t.id)
      .indexOf(favori.id);

    if(indexToDelete == -1){
      return;
    }

    this.favoris.splice(indexToDelete,1);
  }


}
