import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public users;
  public identidadUsuario;
  public userModel: User;

  displayedColumns: string[] = ['id', 'name', 'lastName','user', 'email','password','loan','butons'];
  public dataSource 

  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _userService: UserService,
  ) { 
    this.userModel = new User("","","","","","","","",[{_id:"",state:"",idBook:""}],0,0);
  }

  ngOnInit(): void {
    

    this.getUsers();
  }
  editUsers(){
    this._userService.editUsers(this.userModel).subscribe(
      response=>{
        this.getUsers();
      }

    )
  }

  deleteUsers(idUser){
    this._userService.deleteUsers(idUser).subscribe(
      response=>{
        this.getUsers();
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
  

  getUsers(){
    this._userService.listUsers().subscribe(
      response =>{
        
        this.dataSource = new MatTableDataSource(response.userFound);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
        
      },
      error =>{
        console.log(<any>error)
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

 

  registerUsers(){
    this._userService.registerUsers(this.userModel).subscribe(
      response=>{

        this.getUsers();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  

  

}
