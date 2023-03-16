import { Component, OnInit } from '@angular/core';
import { NgbAlert, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
popularProduct: undefined | product[]
trendyProducts: undefined | product[]
  constructor(private productServices: ProductsService) {}

  ngOnInit(): void {
    this.productServices.popularProduct().subscribe((data) => {
      this.popularProduct = data
    });
    this.productServices.trendyProduct().subscribe((payLoad) => {
      this.trendyProducts = payLoad
    })

  }
}
