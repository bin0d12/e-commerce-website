import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LogIn } from '../interface/logIn-interface';
import { SignUp } from '../interface/signup-interface';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: SignUp){
     this.http.post('http://localhost:3000/seller', data, {observe: "body"})
    .subscribe((res) => {
      this.isSellerLoggedIn.next(true)
      // it stored the user dat to check the user login or not
      localStorage.setItem('seller', JSON.stringify(res))
      // when it is true it will redirect to seller home page
      this.router.navigate(['seller-home'])
    });
    return true;
  }
  reloadSeller(){
    // it is checking user is login or not after page reload
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogIn(data: LogIn){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, 
    {observe: 'response'}
    ).subscribe((result: any) => {
      if(result && result.body && result.body.length){
        localStorage.setItem('seller', JSON.stringify(result))
      // when it is true it will redirect to seller home page
      this.router.navigate(['seller-home'])
      } else {
        this.isLoginError.emit(true)
      }
    })
  }
}