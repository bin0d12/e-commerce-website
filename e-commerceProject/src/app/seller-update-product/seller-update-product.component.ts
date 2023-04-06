import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  constructor(private productServices: ProductsService, private route: ActivatedRoute, private router: Router) { }
  productData: undefined | product
  productMessage: undefined | string;
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    
    productId && this.productServices.getProduct(productId).subscribe((data) => {
      this.productData = data
    })
    debugger
    this.productServices.sendData("binod")
  }
  addProductsData(val: product){
    if(this.productData){
      val.id = this.productData.id
    }
    this.productServices.updateProduct(val).subscribe((payLoad) => {
      if(payLoad){
        this.productMessage = "product has updated"
      }
    })
  }
}
