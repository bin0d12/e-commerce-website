import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../signup-interface'
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private sellerService: SellerService, private router: Router) { }

  ngOnInit(): void {
  }
  signUp(val: SignUp) {
    console.log(val, "dncjkdsfjkdsb");
    this.sellerService.userSignUp(val)
  }
}
