import { Component, OnInit , ViewChild} from '@angular/core';
import { Magazine } from 'src/app/models/magazine.model';
import { MagazineService } from 'src/app/services/magazine.service';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss'],
  providers: [MagazineService]
})
export class MagazineComponent implements OnInit {
  public magazines;
  public magazineModel: Magazine
  displayedColumns: string[] = ['title', 'author', 'edition','description','frequency','keywords', 'topics','exemplar','copy','available','butons'];
  public dataSource 

  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _magazineService: MagazineService,
  ) { 
    this.magazineModel = new Magazine("","","",0,"","",0,[{}],[{}],0,0,0,0);
  }

  ngOnInit(): void {
    this.listMagazines();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addMagazine(){
    this._magazineService.addMagazine(this.magazineModel).subscribe(
      response=>{

        this.listMagazines();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  editMagazine(){
    this._magazineService.editMagazine(this.magazineModel).subscribe(
      response=>{
        this.listMagazines();
      }

    )
  }

  deleteMagazine(idMagazine){
    this._magazineService.deleteMagazine(idMagazine).subscribe(
      response=>{
        this.listMagazines();
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

  getMagazineId(idMagazine){
    this._magazineService.getMagazineId(idMagazine).subscribe(
      response=>{
        this.magazineModel = response.magazineFind;

      }
    )
  }  

  listMagazines(){
    this._magazineService.listMagazines().subscribe(
      response =>{
        this.dataSource = new MatTableDataSource(response.magazineFind);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error =>{
        console.log(<any>error)
      }
    )
  }
}
