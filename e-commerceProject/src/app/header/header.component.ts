import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // this is used for hiding the search bar
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          // get the seller name
          let sellerNameStore = localStorage.getItem('seller');
          let sellerNameGet =
            sellerNameStore && JSON.parse(sellerNameStore).body[0];
          this.sellerName = sellerNameGet.name; // here you will get the seller name
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
}
