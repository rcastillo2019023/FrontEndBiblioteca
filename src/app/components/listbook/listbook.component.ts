import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listbook',
  templateUrl: './listbook.component.html',
  styleUrls: ['./listbook.component.scss'],
  providers: [BookService]
})
export class ListbookComponent implements OnInit {
  public books;
  public bookModel: Book;

  public userModel : User;
  public token;
  public identidad;
  
  public identidadId;

  constructor(
    private _userService: UserService,
    private _bookService: BookService,
  ) { 
    this.identidadId = this._userService.getIdentidad()._id;
    this.bookModel = new Book("","","",0,[{}],"",[{}],0,0,0,0);
  }

  ngOnInit(): void {
    this.listBooks();
  }

  obtenerUserId(){
    this._userService.getUserId(this.identidadId).subscribe(
      response=>{
        this.identidad = response.userFind;
        localStorage.setItem('persona', JSON.stringify(this.identidad));
        

      }
    )
  }

  lendBook(idBook){
    this._userService.lendBook(idBook).subscribe(
      response=>{
        //localStorage.setItem('persona', JSON.stringify(this.identidad));
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Libro Prestado'
        })
    this.listBooks();
    this.obtenerUserId();
     
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'No se pudo prestar el libro',
          showConfirmButton: false,
          timer: 1500

        })
      }
    )
  }  

 

  getBookId(idBook){
    this._bookService.getBookId(idBook).subscribe(
      response=>{
        this.bookModel = response.bookFind;

      }
    )
  }  

  listBooks(){
    this._bookService.listBooks().subscribe(
      response =>{
        this.books = response.bookFind;
      },
      error =>{
        console.log(<any>error)
      }
    )
  }
}
