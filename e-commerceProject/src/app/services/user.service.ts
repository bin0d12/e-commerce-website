import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn } from '../interface/logIn-interface';
import { SignUp } from '../interface/signup-interface';

@Injectable({
  providedIn: 'root'
})
// return this.http.post(`${this.apiUrl}/product`, data)

export class UserService {
  userApiUrl = "http://localhost:3000";
  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: SignUp){
   return  this.http.post(`${this.userApiUrl}/user`, user, {observe: "response"}).subscribe((data) => {
    if(data){
      localStorage.setItem('user', JSON.stringify(data))
      this.router.navigate(['/'])
    }
   } )
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  userLogIn(user: LogIn){
    return this.http.get<SignUp[]>(`${this.userApiUrl}/user?email=${user.email}&password=${user.password}`,
     {observe: 'response'}
     ).subscribe((data) => {
      if(data && data.body?.length){
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user',JSON.stringify(data.body[0]));
        this.router.navigate(['/']);
      this.router.navigate(['/'])        
      }else{
        this.invalidUserAuth.emit(true)
      }
     })
  }
}
