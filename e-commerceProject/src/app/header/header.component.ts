import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // this is used for hiding the search bar
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string = '';
  cartItem = 0;
  users: any;
  constructor(
    private route: Router,
    private productService: ProductsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // get the seller name
          let sellerNameStore = localStorage.getItem('seller');
          let sellerFormatData;
          // if(typeof sellerNameStore === 'string'){
          //   sellerFormatData =JSON.parse(sellerNameStore)
          // } else {
          //   sellerFormatData = sellerNameStore
          // }
          // this.sellerName = sellerFormatData.body.response.name
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let formatedData;
          if (typeof userStore === 'string') {
            formatedData = JSON.parse(userStore);
          } else {
            formatedData = userStore;
          }
          this.userName = formatedData.response.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    this.productService.cartDataAsynchronous.subscribe((items) => {
      this.cartItem = items.length;
    });
  }
  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      let element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((payLoad) => {
        if (payLoad.length > 5) {
          payLoad.length = 5;
        }
        this.searchResult = payLoad;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }
  reDirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
  userLogOut() {
    localStorage.removeItem('user');
    this.route.navigate(['auth-user']);
  }
}
