export class Film {

  private _id:number;
  private _idFilm:number;
  private _title:string;
  private _overwiew:string;
  private _releaseDate:string;
  private _voteAverage:number;
  private _posterLink:string;


  constructor(idFilm:number=0,title: string="", overwiew: string="", releaseDate: string="", voteAverage: number=0, posterLink: string="") {
    this._idFilm = idFilm;
    this._title = title;
    this._overwiew = overwiew;
    this._releaseDate = releaseDate;
    this._voteAverage = voteAverage;
    this._posterLink = posterLink;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get idFilm():number{
    return this._idFilm;
  }

  set idFilm(value:number){
    this._idFilm = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get overwiew(): string {
    return this._overwiew;
  }

  set overwiew(value: string) {
    this._overwiew = value;
  }

  get releaseDate(): string {
    return this._releaseDate;
  }

  set releaseDate(value: string) {
    this._releaseDate = value;
  }

  get voteAverage(): number {
    return this._voteAverage;
  }

  set voteAverage(value: number) {
    this._voteAverage = value;
  }

  get posterLink(): string {
    return this._posterLink;
  }

  set posterLink(value: string) {
    this._posterLink = value;
  }

  public fromJson(Json:any):Film{
    Object.assign(this,Json);
    return this;
  }

  public toJson():any{
    return{
      "id": this._id,
      "idFilm": this._idFilm,
      "title": this._title,
      "overview": this._overwiew,
      "releaseDate": this._releaseDate,
      "voteAverage": this._voteAverage,
      "posterLink": this._posterLink
    }
  }
}
