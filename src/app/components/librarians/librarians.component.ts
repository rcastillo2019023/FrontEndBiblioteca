import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-librarians',
  templateUrl: './librarians.component.html',
  styleUrls: ['./librarians.component.scss'],
  providers: [UserService]
})
export class LibrariansComponent implements OnInit {
  public users;
  public identidadUsuario;
  public userModel: User;
  displayedColumns: string[] = ['id', 'name', 'lastName','user', 'email','password','butons'];
  public dataSource 

  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.userModel = new User("","","","","","","","",[{_id:"",state:"",idBook:""}],0,0);
   }

  ngOnInit(
  ): void {
    this.getLibrarians();
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUsers(){
    this._userService.editUsers(this.userModel).subscribe(
      response=>{
        this.getLibrarians();
      }

    )
  }

  deleteUsers(idUser){
    this._userService.deleteUsers(idUser).subscribe(
      response=>{
        this.getLibrarians();
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
 
  getUserId(idUsuario){
    this._userService.getUserId(idUsuario).subscribe(
      response=>{
        this.userModel = response.userFind;

      }
    )
  }  

  getLibrarians(){
    this._userService.listLibrarians().subscribe(
      response =>{
        this.dataSource = new MatTableDataSource(response.usersFound);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  registerLibrarians(){
    this._userService.registerLibrarians(this.userModel).subscribe(
      response=>{

        this.getLibrarians();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
