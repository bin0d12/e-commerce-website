import { Component, OnInit } from '@angular/core';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';
import { JwtDecodeOptions } from 'jwt-decode';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  selectedFile: File | undefined;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }
  addProductsData(value: product){
    this.productService.addProduct(value).subscribe((payLoad:any) => {
      if(payLoad) {
        this.addProductMessage = "product add successfully"
      }
      setTimeout(() => (this.addProductMessage = undefined ), 3000)      
    })   
  }
  onFileSelected(event: { target: { files: (File | undefined)[]; }; }): void {
    this.selectedFile = event.target.files[0];
  }
}
