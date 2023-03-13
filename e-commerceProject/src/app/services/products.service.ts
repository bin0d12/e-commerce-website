import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../signup-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private router: Router, private http: HttpClient) { }
  addProduct(data: product){
   return this.http.post('http://localhost:3000/product', data)
      // console.log(data, "payyyyyyyyload");
  }
  getProducts(){
    return this.http.get<product[]>('http://localhost:3000/product')
  }
}
