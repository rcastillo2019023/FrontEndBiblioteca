import { Component, OnInit ,ViewChild} from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [BookService]
})
export class BookComponent implements OnInit {
  public books;
  public bookModel: Book;

  displayedColumns: string[] = ['title', 'author', 'edition','description','keywords', 'topics','copy','available','butons'];
  public dataSource;

  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;

    
  
  public libros;
  constructor(
    private _bookService: BookService,
   
  ) { 
    this.bookModel = new Book("","","",0,[{}],"",[{}],0,0,0,0);
  }

  ngOnInit(): void {
    this.listBooks();
  }


  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  addBook(){
    this._bookService.addBook(this.bookModel).subscribe(
      response=>{

        this.listBooks();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  editBooks(){
    this._bookService.editBook(this.bookModel).subscribe(
      response=>{
        console.log(response);
        this.listBooks();
      }

    )
  }

  deleteBooks(idBook){
    this._bookService.deleteBook(idBook).subscribe(
      response=>{
        this.listBooks();
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo eliminar el usuario ',
          showConfirmButton: false,
          timer: 1500,

        });
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
      
        this.dataSource = new MatTableDataSource(response.bookFind);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.books = response.bookFind;
        this.libros = response.bookFind;
        
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

}
