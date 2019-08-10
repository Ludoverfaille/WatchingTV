export class Favori {
  private _id:number;
  private _idAPI:number;
  private _element:number;
  private _elementType:string;
  private _utilisateur:number;


  constructor(idAPI:number=0,element: number =0, elementType: string ="", utilisateur: number=0) {
    this._idAPI = idAPI;
    this._element = element;
    this._elementType = elementType;
    this._utilisateur = utilisateur;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get idAPI(): number {
    return this._idAPI;
  }

  set idAPI(value: number) {
    this._idAPI = value;
  }

  get element(): number {
    return this._element;
  }

  set element(value: number) {
    this._element = value;
  }

  get elementType(): string {
    return this._elementType;
  }

  set elementType(value: string) {
    this._elementType = value;
  }

  get utilisateur(): number {
    return this._utilisateur;
  }

  set utilisateur(value: number) {
    this._utilisateur = value;
  }

  public fromJson(Json:any):Favori{
    Object.assign(this,Json);
    return this;
  }

  public toJson():any{
    return{
      "id": this._id,
      "idAPI": this._idAPI,
      "element": this._element,
      "elementType": this._elementType,
      "utilisateur": this._utilisateur
    }
  }
}
