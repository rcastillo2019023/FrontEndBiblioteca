import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myloans',
  templateUrl: './myloans.component.html',
  styleUrls: ['./myloans.component.scss']
})
export class MyloansComponent implements OnInit {
  public identidad;
  public users;
  public userModel: User;
  public record;
  public identidadId;

  public rutaID: String;

  constructor(
    
    public _userService: UserService,
  ) {
    this.userModel = new User("","","","","","","","",[{_id:"",state:"",idBook:""}],0,0);
   }

  ngOnInit(): void {
  }
  

  returnBook(id,id2){
    this._userService.returnBook(id,id2).subscribe(
      response=>{
        this.identidad = response.comentarioEditado
        localStorage.setItem('persona', JSON.stringify(this.identidad));
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
          title: 'Libro Devuelto'
        })
      } 
    )
  
  }
  returnMagazine(id,id2){
    this._userService.returnMagazine(id,id2).subscribe(
     
      response=>{
        this.identidad = response.comentarioEditado
        localStorage.setItem('persona', JSON.stringify(this.identidad));
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
          title: 'Libro Devuelto'
        })
      } 
    )
  
  }

}
