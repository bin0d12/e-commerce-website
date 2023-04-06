import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { cart } from '../interface/cart-interface';
import { product } from '../interface/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // subject: any
  subject = new Subject()
  getSubject = this.subject.asObservable()

  constructor(private router: Router, private http: HttpClient) {
  }
  apiUrl = 'http://localhost:3000';
  cartDataAsynchronous = new EventEmitter<product[] | []>();
  addProduct(data: product) {
    return this.http.post(`${this.apiUrl}/product`, data);
  }
  productList():Observable<any> {
    return this.http.get<product[]>(`${this.apiUrl}/product`);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/product/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<product>(`${this.apiUrl}/product/${id}`);
  }
  updateProduct(product: product) {
    return this.http.put(`${this.apiUrl}/product/${product.id}`, product);
  }
  popularProduct() {
    return this.http.get<product[]>(`${this.apiUrl}/product?_limit=4`);
    // return this.http.get<product[]>("http://localhost:3000/product?_limit=4")
  }
  trendyProduct() {
    return this.http.get<product[]>(`${this.apiUrl}/product?_limit=8`);
  }
  searchProduct(query: string) {
    return this.http.get<product[]>(`${this.apiUrl}/product?q=${query}`);
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartDataAsynchronous.emit(cartData);
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      console.log(items, 'items');
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartDataAsynchronous.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post(`${this.apiUrl}/cart`, cartData);
  }
  getCartList(userId: number) {
    console.log(userId, "useriddddddddd");
    
    return this.http
      .get<product[]>(`${this.apiUrl}/cart?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.log(result, 'resulttttt');
        
        if (result && result.body) {
          this.cartDataAsynchronous.emit(result.body);
        }
      });
  }
  sendData(val: any){ debugger
   this.subject.next(val)
  }
  GetData(){

  }
}
