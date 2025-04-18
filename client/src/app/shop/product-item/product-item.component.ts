import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent  {
  
  @Input() product?: IProduct;



}
