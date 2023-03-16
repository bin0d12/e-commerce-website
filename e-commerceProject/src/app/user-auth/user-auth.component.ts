import { Component, OnInit } from '@angular/core';
import { LogIn } from '../interface/logIn-interface';
import { SignUp } from '../interface/signup-interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = ""
  constructor(private userService: UserService) { }

  ngOnInit(): void { 
    this.userService.userAuthReload()
  }
  signUp(data: SignUp){
    this.userService.userSignUp(data)
  }
  userLogIn(data: LogIn){
    this.userService.userLogIn(data)
    this.userService.invalidUserAuth.subscribe((result) => {
      if(result){
        this.authError = "please enter valid user details"
      }
      
    })
    // this.userService.userLogIn(data).subscribe((payLoad) =>{
      
    // })
  }
  openLogin(){
    this.showLogin = true

  }
  openSignUp(){
    this.showLogin = false

  }
}
