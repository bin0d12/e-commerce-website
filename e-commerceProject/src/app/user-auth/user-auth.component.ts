import { Component, OnInit } from '@angular/core';
import { cart } from '../interface/cart-interface';
import { LogIn } from '../interface/logIn-interface';
import { product } from '../interface/product-interface';
import { SignUp } from '../interface/signup-interface';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(
    private userService: UserService,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.userAuthReload();
  }
  signUp(data: SignUp) {
    let body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    this.userService.userSignUp(body).subscribe((res) => {
      console.log(res);
    });
  }
  userLogIn(data: LogIn) {
    let body = {
      email: data.email,
      password: data.password
    }
    // this.userService.userLogIn(body).subscribe((data) => {
      this.userService.userLogIn(body)      
      // .subscribe((data) => {

      //   let formatedData;
      //   if (typeof data === 'string') {
      //     formatedData = JSON.parse(data);
      //   } else {
      //     formatedData = data;
      //   }
      //   console.log(formatedData.response.name, "formedDatatatat");
        
      //   // use the formatedData object here
      // });
    // this.userService.userLogIn(body).subscribe((data) => {
    //   let formatedData = JSON.parse(data)

    //   this.router.navigate(['/']);
    // });
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'please enter valid user details';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('item stored in db');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  }
}
