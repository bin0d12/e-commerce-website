import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: undefined | product
  productQty: number =1
  constructor(private activateRoute: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    productId && this.productService.getProduct(productId).subscribe((payLoad)=> {
      this.productDetails = payLoad

    })
  }
handleQty(val: string){
  if(this.productQty < 20 && val ==='inc'){
    this.productQty+=1
  } else if(this.productQty>1 && val==='dec'){
    this.productQty-=1
  }

}
}
