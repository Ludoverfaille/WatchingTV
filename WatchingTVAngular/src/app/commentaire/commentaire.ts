export class Commentaire {

  private _id:number;
  private _idFavori:number;
  private _contenu:string;

  constructor(idFavori:number = 0, contenu:string = ""){
    this._idFavori = idFavori;
    this._contenu = contenu;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get idFavori(): number {
    return this._idFavori;
  }

  set idFavori(value: number) {
    this._idFavori = value;
  }

  get contenu(): string {
    return this._contenu;
  }

  set contenu(value: string) {
    this._contenu = value;
  }

  public fromJson(Json:any):Commentaire{
    Object.assign(this,Json);
    return this;
  }

  public toJson():any{
    return{
      "id": this._id,
      "idFavori": this._idFavori,
      "contenu": this._contenu
    }
  }
}
