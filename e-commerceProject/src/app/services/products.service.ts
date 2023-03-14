import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../interface/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private router: Router, private http: HttpClient) { }
  apiUrl = 'http://localhost:3000'
  addProduct(data: product){
   return this.http.post(`${this.apiUrl}/product`, data)
  }
  productList(){
    return this.http.get<product[]>(`${this.apiUrl}/product`)
  }
  deleteProduct(id: number){
    return this.http.delete(`${this.apiUrl}/product/${id}`)
  }
  getProduct(id:string){
    return this.http.get<product>(`${this.apiUrl}/product/${id}`)
  }
  updateProduct(product: product){
    console.log(product, "oiddddddddd");
    
    return this.http.put(`${this.apiUrl}/product/${product.id}`, product)
    
  }
}
