import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private BackendApiUrl = 'http://localhost:3005/products';

  cartDataAsynchronous = new EventEmitter<product[] | []>();
  addProduct(data: product) {
    return this.http.post(`${this.BackendApiUrl}/addProducts`, data)
    // return this.http.post(`${this.apiUrl}/product`, data);
  }
  productList():Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<product[]>(`${this.BackendApiUrl}/productList`, {headers});
    // return this.http.get<product[]>(`${this.apiUrl}/product`);
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
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartDataAsynchronous.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post(`${this.apiUrl}/cart`, cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<product[]>(`${this.apiUrl}/cart?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartDataAsynchronous.emit(result.body);
        }
      });
  }
  sendData(val: any){ 
   this.subject.next(val)
  }
  GetData(){

  }
}
