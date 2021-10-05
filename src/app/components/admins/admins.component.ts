import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [UserService]
})
export class AdminsComponent implements OnInit {
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

  ngOnInit(): void {
    this.getAdmins();
  }

  editUsers(){
    this._userService.editUsers(this.userModel).subscribe(
      response=>{
        this.getAdmins();
      }

    )
  }

  deleteUsers(idUser){
    this._userService.deleteUsers(idUser).subscribe(
      response=>{
        this.getAdmins();
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

  getAdmins(){
    this._userService.listAdmins().subscribe(
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

  registerAdmin(){
    this._userService.registerAdmin(this.userModel).subscribe(
      response=>{

        this.getAdmins();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
