import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Magazine } from 'src/app/models/magazine.model';
import { MagazineService } from 'src/app/services/magazine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listmagazine',
  templateUrl: './listmagazine.component.html',
  styleUrls: ['./listmagazine.component.scss'],
  providers: [MagazineService]
})
export class ListmagazineComponent implements OnInit {
  public magazines;
  public magazineModel: Magazine;

  public identidadId;
  public identidad;

  constructor(
    private _userService: UserService,
    private _magazineService: MagazineService
  ) {
    this.identidadId = this._userService.getIdentidad()._id;
    this.magazineModel = new Magazine("","","",0,"","",0,[{}],[{}],0,0,0,0);
   }

  ngOnInit(
  ): void {
    this.listMagazines();
  }

  obtenerUserId(){
    this._userService.getUserId(this.identidadId).subscribe(
      response=>{
        this.identidad = response.userFind;
        localStorage.setItem('persona', JSON.stringify(this.identidad));
        

      }
    )
  }

  lendMagazine(idBook){
    this._userService.lendMagazine(idBook).subscribe(
      response=>{
        //localStorage.setItem('persona', JSON.stringify(this.identidad));
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
          title: 'Revista Prestado'
        })
    this.listMagazines();
    this.obtenerUserId();
     
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'No se pudo prestar el libro',
          showConfirmButton: false,
          timer: 1500

        })
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
        this.magazines = response.magazineFind;
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

}
