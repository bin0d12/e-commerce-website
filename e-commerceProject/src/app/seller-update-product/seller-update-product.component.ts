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
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    
    productId && this.productServices.getProduct(productId).subscribe((data) => {
      console.log(data, "datatat");
      this.productData = data
    })
  }


  addProductsData(val: product){
    if(this.productData){
      val.id = this.productData.id
    }
    this.productServices.updateProduct(val).subscribe((payLoad) => {
      console.log(payLoad);
    })
    this.router.navigate(['/seller-home'])
  }

}
