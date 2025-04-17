import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/models/product';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent  {
  
  @Input() product?: IProduct;



}
