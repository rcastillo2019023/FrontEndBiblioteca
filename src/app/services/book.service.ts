import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { Observable } from "rxjs";
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
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


addBook(book: Book): Observable<any>{

  let headersToken = this.headersV.set('Authorization', this.getToken())
  let params = JSON.stringify(book);

  return this._http.post(this.url + 'addBook', params, { headers: headersToken })
 }
 editBook(book: Book):Observable<any>{
  let params = JSON.stringify(book);
  let headersToken = this.headersV.set('Authorization', this.getToken())


  return this._http.put(this.url + 'updateBook/' + book._id, params, {headers: headersToken})
}

deleteBook(id: Book):Observable<any>{

  let headersToken = this.headersV.set('Authorization', this.getToken())


  return this._http.delete(this.url + 'deleteBook/' + id, {headers: headersToken})
}


  //vista general//
  listBooks(): Observable<any>{
    return this._http.get(this.url + 'listBooks')
  }

  listBooksRecord(): Observable<any>{
    return this._http.get(this.url + 'listBooksRecord')
  }

  getBookId(id:String): Observable<any>{
    return this._http.get(this.url + 'findBookId/'+ id, {headers: this.headersV})
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
