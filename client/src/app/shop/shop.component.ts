import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  products: IProduct[] | undefined;

  constructor(private shopService: ShopService){}

  ngOnInit() {
    this.shopService.getProducts().subscribe(response => {
      this.products = response.data;
    }, error =>{
      console.log(error);
    });
  }

}
