import { Component, OnInit,ViewChild } from '@angular/core';
import { Magazine } from 'src/app/models/magazine.model';
import { MagazineService } from 'src/app/services/magazine.service';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-reportmagazine',
  templateUrl: './reportmagazine.component.html',
  styleUrls: ['./reportmagazine.component.scss']
})
export class ReportmagazineComponent implements OnInit {
  public magazines;
  public magazineModel: Magazine

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
  public revistas;

  constructor(
    
    private _magazineService: MagazineService,
  ) {7
    this.magazineModel = new Magazine("","","",0,"","",0,[{}],[{}],0,0,0,0); }

  ngOnInit(
  ): void {
    this.listMagazine();
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


 
  listMagazine(){
    this._magazineService.listMagazineRecord().subscribe(
      response =>{
      
        this.dataSource = new MatTableDataSource(response.magazineFind);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.magazines = response.magazineFind;
        this.revistas = response.magazineFind;
        this.revistas.forEach(datos => {
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
