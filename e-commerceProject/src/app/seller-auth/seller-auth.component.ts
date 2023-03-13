import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { LogIn } from '../interface/logIn-interface';
import { SignUp } from '../interface/signup-interface';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private sellerService: SellerService, private router: Router) {}
  showLogin: boolean = false;
  authError: String = '';
  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }
  signUp(val: SignUp) {
    this.sellerService.userSignUp(val);
  }
  login(val: LogIn) {
    this.sellerService.userLogIn(val);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'email and password is incorrect';
      }
    });
  }
  // open login page
  openLogin() {
    this.showLogin = true;
  }
  // open sign in page
  openSignUp() {
    this.showLogin = false;
  }
}
