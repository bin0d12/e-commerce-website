import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
users: any

  ngOnInit(): void {
    
  }
  constructor(private userService: UserService){}
  title = 'e-commerceProject';
}
