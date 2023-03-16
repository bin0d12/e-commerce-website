import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../interface/product-interface';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchData : undefined | product[]
  constructor(private activateRoute: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query')
    query && this.productService.searchProduct(query).subscribe((payLoad) => {
      this.searchData = payLoad
    })
    
  }

}
