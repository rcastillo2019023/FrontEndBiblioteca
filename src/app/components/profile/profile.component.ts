import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public identidad;
  public users;
  public userModel: User;
  public record;
  public identidadId;

  public rutaID: String;

  constructor(
    public _userService: UserService,
    public _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { 
    this.identidadId = this._userService.getIdentidad()._id;
    this.userModel = new User("","","","","","","","",[{_id:"",state:"",idBook:""}],0,0);
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(infoRuta => {
      this.rutaID = infoRuta.get('idUser');
    })
  }

  obtenerUsuarioId(idUsuario){
    this._userService.getUserId(this.identidadId).subscribe(
      response=>{
        this.users = response.userFind;
     

      }
    )
  }
  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('persona'));
    if (identidad2 != 'undefined') {
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }
    return this.identidad;
  }

}
