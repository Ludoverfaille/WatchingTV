import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commentaire} from './commentaire';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CommentaireService {

  public static readonly  URL_API_COMMENTAIRE:string="/api/commentaire";

  constructor(public http:HttpClient) { }

  public query():Observable<Commentaire[]>{
    return this.http.get<Commentaire[]>(CommentaireService.URL_API_COMMENTAIRE);
  }

  public post(commentaire:Commentaire): Observable<Commentaire>{
    return this.http.post<Commentaire>(CommentaireService.URL_API_COMMENTAIRE, commentaire.toJson());
  }

  public update(commentaire:Commentaire): Observable<any>{
    return this.http.put(CommentaireService.URL_API_COMMENTAIRE, commentaire.toJson());
  }

  public delete(commentaire:Commentaire): Observable<any>{
    return this.http.delete<any>(CommentaireService.URL_API_COMMENTAIRE + "/" + commentaire.id);
  }

}
