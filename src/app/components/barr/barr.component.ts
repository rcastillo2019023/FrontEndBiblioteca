import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router }from '@angular/router';

@Component({
  selector: 'app-barr',
  templateUrl: './barr.component.html',
  styleUrls: ['./barr.component.scss'],
  providers: [UserService]
})
export class BarrComponent implements OnInit {
  public identidad;

  constructor(
    public _userService: UserService,
    private _router: Router
  ) { 
    this.identidad = this._userService.getIdentidad();
  }

  ngOnInit(): void {
  }
  cleanStorage() {
    localStorage.clear()


    this._router.navigate(['/home'])

    error => {
      console.log(<any>error);

    }
  }

}
