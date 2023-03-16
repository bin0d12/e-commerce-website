import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';

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
  constructor(private route: Router, private productService: ProductsService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // get the seller name
          let sellerNameStore = localStorage.getItem('seller');
          let sellerNameGet = sellerNameStore && JSON.parse(sellerNameStore).body[0];
          this.sellerName = sellerNameGet.name; // here you will get the seller name
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
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
