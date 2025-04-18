import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct | undefined;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute){}

  ngOnInit(){
    this.loadProduct();
  }

  loadProduct() {
    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    if (id && id > 0){
      this.shopService.getProduct(id).subscribe(
        product => {
          this.product = product;
      }, error => {
        console.log(error);
      })
    }
  }


}
