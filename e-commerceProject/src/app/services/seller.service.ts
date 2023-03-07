import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { SignUp } from '../signup-interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp){
     this.http.post('http://localhost:3000/seller', data, {observe: "body"})
    .subscribe((res) => {
      this.isSellerLoggedIn.next(true)
      localStorage.setItem('seller', JSON.stringify(res))
      this.router.navigate(['seller-home'])
    });
    return true;
  }
}
