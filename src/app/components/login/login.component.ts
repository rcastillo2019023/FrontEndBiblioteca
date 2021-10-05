import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userModel : User;
  public token;
  public identidad;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { 
    this.userModel = new User("","","","","","","","",[{_id:"",state:"",idBook:""}],0,0);
  }

  ngOnInit(): void {
  }

  login() {
    this._userService.login(this.userModel).subscribe(
      res =>{
        this.identidad = res.userFound
        this.token = res.token

        localStorage.setItem('persona', JSON.stringify(this.identidad));
        localStorage.setItem('token', this.token);

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
          title: 'Bienvenido!'
        })

        this._router.navigate(['/home'])
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrectos consulta tu registro con un administrador',
          showConfirmButton: false,
          timer: 1500

        })
      }
    )
  }

}
