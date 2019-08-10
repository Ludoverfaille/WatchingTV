export class Serie {

  private _id:number;
  private _idSerie:number;
  private _title:string;
  private _overwiew:string;
  private _season:number;
  private _episode:number;
  private _status:string;
  private _releaseDate:string;
  private _voteAverage:number;
  private _posterLink:string;


  constructor(idSerie:number=0,title: string="", overwiew: string="", season: number=0, episode: number=0, status: string="", releaseDate: string="", voteAverage: number=0, posterLink: string="") {
    this._idSerie = idSerie;
    this._title = title;
    this._overwiew = overwiew;
    this._season = season;
    this._episode = episode;
    this._status = status;
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

  get idSerie(): number{
    return this._idSerie;
  }

  set idSerie(value: number){
    this._idSerie = value;
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

  get season(): number {
    return this._season;
  }

  set season(value: number) {
    this._season = value;
  }

  get episode(): number {
    return this._episode;
  }

  set episode(value: number) {
    this._episode = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
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

  public fromJson(Json:any):Serie{
    Object.assign(this,Json);
    return this;
  }

  public toJson():any{
    return{
      "id": this._id,
      "title": this._title,
      "overview": this._overwiew,
      "season":this._season,
      "episode":this._episode,
      "status":this._status,
      "releaseDate": this._releaseDate,
      "voteAverage": this._voteAverage,
      "posterLink": this._posterLink
    }
  }
}
