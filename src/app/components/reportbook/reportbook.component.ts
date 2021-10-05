import { Component, OnInit,ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-reportbook',
  templateUrl: './reportbook.component.html',
  styleUrls: ['./reportbook.component.scss']
})
export class ReportbookComponent implements OnInit {
  public books;
  public bookModel: Book;

  displayedColumns: string[] = ['title', 'author', 'record',];
  public dataSource;

  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;

    
  chartOptions = {
    responsive: true,
  };
  chartLabels = [];
  chartData = [];
  chartColors = [{
    backgroundColor: ['red',"#616161", '#0F0', 'rgba(41, 182, 246,0.75)', "#9C27B0","#5D4037","#FFEB3B","#009688","#E91E63","#7C4DFF"],
    borderColor: ["black","black","black","black","black","black","black","black","black","black","black",]
  }];
  chartLegend = true;
  chartPlugins = [];
  public libros;
  constructor(
    private _bookService: BookService,
   
  ) { 
    this.bookModel = new Book("","","",0,[{}],"",[{}],0,0,0,0);
  }

  ngOnInit(): void {
    
    this.listBooks();
  }
  pdfCreate(){
    const options ={
    filename: 'reporte',
    image:{type: 'jpeg'},
    html2canvas:{},
    jsPDF:{orientation:'landscape'}
    };
    const content : Element = document.getElementById('exportPDf');
    html2pdf()
    .from(content)
    .set(options)
    .save();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


 
  listBooks(){
    this._bookService.listBooksRecord().subscribe(
      response =>{
      
        this.dataSource = new MatTableDataSource(response.bookFind);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.books = response.bookFind;
        this.libros = response.bookFind;
        this.libros.forEach(datos => {
          this.chartData.push(datos.record);
          this.chartLabels.push(datos.title);
        });
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

}



