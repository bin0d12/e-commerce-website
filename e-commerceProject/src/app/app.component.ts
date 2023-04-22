import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
users: any
// constructor(){}
 
  constructor(private userService: UserService, private sellerService: SellerService){}
  title = 'e-commerceProject';

ngOnInit(): void {
  // this.sellerService.reloadSeller()
  
}
}
