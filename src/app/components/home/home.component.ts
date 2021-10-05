import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[UserService]
})
export class HomeComponent implements OnInit {

  constructor(
    
    public _userService: UserService,
  ) { }

  ngOnInit(): void {
  }

}
