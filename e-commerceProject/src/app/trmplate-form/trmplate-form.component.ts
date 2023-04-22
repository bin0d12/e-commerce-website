import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trmplate-form',
  templateUrl: './trmplate-form.component.html',
  styleUrls: ['./trmplate-form.component.css']
})
export class TrmplateFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  allProducts(val: any){
    console.log(val);
    
  }

}
