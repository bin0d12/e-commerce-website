import { Component, OnInit } from '@angular/core';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  constructor(private productService: ProductsService) { }
  productList: undefined | product[]

  ngOnInit(): void {
    this.productService.getProducts().subscribe((payLoad) => {
      console.log(payLoad, "payyyyyyyyyyyyyload");
      this.productList = payLoad
      
    })
    this.productList = []
  }
  // getProduct(data: product){
  //   this.productService.getProducts(data).subscribe((payLoad) => {
  //     console.log(payLoad, "payyyyyyyyyyyyyload");
      
  //   })

  }
// }
