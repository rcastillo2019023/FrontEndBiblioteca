import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Magazine} from '../models/magazine.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {
  public url: String;
  public identidad;
  public headersV = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }
  //vistas admin//


addMagazine(magazine: Magazine): Observable<any>{

  let headersToken = this.headersV.set('Authorization', this.getToken())
  let params = JSON.stringify(magazine);

  return this._http.post(this.url + 'addMagazine', params, { headers: headersToken })
 }
 editMagazine(magazine: Magazine):Observable<any>{
  let params = JSON.stringify(magazine);
  let headersToken = this.headersV.set('Authorization', this.getToken())


  return this._http.put(this.url + 'updateMagazine/' + magazine._id, params, {headers: headersToken})
}

deleteMagazine(id: Magazine):Observable<any>{
  
  let headersToken = this.headersV.set('Authorization', this.getToken())


  return this._http.delete(this.url + 'deleteMagazine/' +id, {headers: headersToken})
}

listMagazineRecord(): Observable<any>{
  return this._http.get(this.url + 'listMagazinesRecord')
}


  //vista general//
  listMagazines(): Observable<any>{
    return this._http.get(this.url + 'listMagazines')
  }

  
  getMagazineId(id:String): Observable<any>{
    return this._http.get(this.url + 'findMagazineId/'+ id, {headers: this.headersV})
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
