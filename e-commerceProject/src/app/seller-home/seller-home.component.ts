import { Component, OnInit } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  icon = faTrash
  editIcon = faEdit
  constructor(private productService: ProductsService) { }
  productList: undefined | product[]
  productMessage: undefined | string
  ngOnInit(): void {
 this.list()
  }
  list(){
    this.productService.productList().subscribe((payLoad) => {
      this.productList = payLoad
    })
  }
  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe((result) => {
      if(result){
        this.productMessage = "product deleted"
        this.list()
      }
    })
  }
  }
