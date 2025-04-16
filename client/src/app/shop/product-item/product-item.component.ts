import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
  
  @Input()
  product?: IProduct;

  ngOnInit(): void {
    console.log('ProductItemComponent initialized!');
  }

}
