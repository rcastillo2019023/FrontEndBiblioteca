import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from "rxjs";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: String;
  public identidad;
  public identidadLiga;
  public headersV = new HttpHeaders().set('Content-Type', 'application/json');
  public token;


  constructor(
    public _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  //usuarios Administracion//

  registerAdmin(user: User): Observable<any>{

    let headersToken = this.headersV.set('Authorization', this.getToken())
    let params = JSON.stringify(user);

    return this._http.post(this.url + 'registerAdmin', params, { headers: headersToken })
   }

   registerUsers(user: User): Observable<any>{

    let headersToken = this.headersV.set('Authorization', this.getToken())
    let params = JSON.stringify(user);

    return this._http.post(this.url + 'registerUser', params, { headers: headersToken })
   }
   registerLibrarians(user: User): Observable<any>{

    let headersToken = this.headersV.set('Authorization', this.getToken())
    let params = JSON.stringify(user);

    return this._http.post(this.url + 'registerLibrarian', params, { headers: headersToken })
   }

  listUsers(): Observable<any>{
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.get(this.url + 'listUsers', {headers: headersToken})
 }

 listLibrarians(): Observable<any>{
  console.log(this.getToken)
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.get(this.url + 'listLibrarians', {headers: headersToken})
 }

 listAdmins(): Observable<any>{
  console.log(this.getToken)
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.get(this.url + 'listAdmins', {headers: headersToken})
 }

 editUsers(user: User):Observable<any>{
  let params = JSON.stringify(user);
  let headersToken = this.headersV.set('Authorization', this.getToken())


  return this._http.put(this.url + 'updateUsers/' + user._id, params, {headers: headersToken})
}

deleteUsers(id: User):Observable<any>{
  let headersToken = this.headersV.set('Authorization', this.getToken())


  return this._http.delete(this.url + 'deleteUsers/' + id, {headers: headersToken})
}

 
//general//
lendBook(id): Observable<any>{
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.get(this.url + 'lendBook/'+id, {headers: headersToken})
 }


 returnBook(id,id2): Observable<any>{
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.get(this.url + 'return/'+id+"/"+id2, {headers: headersToken})
 }


 lendMagazine(id): Observable<any>{
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.get(this.url + 'lendMagazine/'+id, {headers: headersToken})
 }


 returnMagazine(id,id2): Observable<any>{
  let headersToken = this.headersV.set('Authorization', this.getToken())

  return this._http.get(this.url + 'returnMagazine/'+id+"/"+id2, {headers: headersToken})
 }

getUserId(id:String): Observable<any>{
  return this._http.get(this.url + 'findUserId/'+ id, {headers: this.headersV})
}

login(userLog): Observable<any> {
  let params = JSON.stringify(userLog);

  return this._http.post(this.url + 'login', params, { headers: this.headersV });
}

 getIdentidad() {
  var identidad2 = JSON.parse(localStorage.getItem('persona'));
  if (identidad2 != 'undefined') {
    this.identidad = identidad2;
  } else {
    this.identidad = null;
  }
  return this.identidad;
}
  getToken(){
  var token2 = localStorage.getItem('token');
  if(token2 != 'undefined'){
    this.token = token2;
  }else{
    this.token = null;
  }

  return this.token;
}
}

