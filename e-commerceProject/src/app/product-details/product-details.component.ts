import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails: undefined | product;
  productQty: number = 1;
  removeCart = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    console.log(productId, 'iddddd');

    productId &&
      this.productService.getProduct(productId).subscribe((payLoad) => {
        this.productDetails = payLoad;
      });
    let cartData = localStorage.getItem('localCart');
    console.log(cartData, 'dattttt');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: product) => productId === item.id.toString());
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
  }
  handleQty(val: string) {
    if (this.productQty < 20 && val === 'inc') {
      this.productQty += 1;
    } else if (this.productQty > 1 && val === 'dec') {
      this.productQty -= 1;
    }
  }
  addToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQty;
      if (!localStorage.getItem('user')) {
        console.log(this.productDetails, 'khdsjkghjg');
        this.productService.localAddToCart(this.productDetails);
        this.removeCart = true;
      }
    }
  }
  removeToCart(productId: number) {
    this.productService.removeItemFromCart(productId);
    this.removeCart = false
  }
}
