export class Utilisateur {
  private _id:number;
  private _username:string;
  private _isAdmin:boolean;
  private _password:string;

  constructor(username: string ="", isAdmin: boolean = false, password: string = ""){
    this._username = username;
    this._isAdmin = isAdmin;
    this._password = password;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  public fromJson(Json:any):Utilisateur{
    Object.assign(this,Json);
    return this;
  }

  public toJson():any{
    return{
      "id": this._id,
      "username": this._username,
      "isAdmin": this._isAdmin,
      "password": this._password
    }
  }
}
