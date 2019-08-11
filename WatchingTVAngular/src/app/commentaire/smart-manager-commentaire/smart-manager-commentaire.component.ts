import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Commentaire} from '../commentaire';
import {CommentaireService} from '../commentaire.service';

@Component({
  selector: 'app-smart-manager-commentaire',
  templateUrl: './smart-manager-commentaire.component.html',
  styleUrls: ['./smart-manager-commentaire.component.css']
})
export class SmartManagerCommentaireComponent implements OnInit, OnDestroy {

  private _commentaires:Commentaire[] = [];
  private _subQueryCommentaire: Subscription;
  private _subPostCommentaire: Subscription;

  constructor(public commentaireService:CommentaireService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void{

  }

  getCommentaires(){
    this._subQueryCommentaire = this.commentaireService
      .query()
      .subscribe(commentaires=>
      this._commentaires = commentaires.map(commentaire=>new Commentaire().fromJson(commentaire)))
  }

  postCommentaire(commentaire:Commentaire){
    this._subPostCommentaire=this.commentaireService.post(commentaire).subscribe(newCommentaire => this.commentaires.push(new Commentaire().fromJson(newCommentaire)));
  }

  get commentaires(): Commentaire[] {
    return this._commentaires;
  }
}
