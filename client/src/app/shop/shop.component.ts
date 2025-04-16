import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from "./product-item/product-item.component";
import { IBrand } from '../shared/models/brands';
import { IType } from '../shared/models/productType';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  products: IProduct[] | undefined;
  brands: IBrand[] | undefined;
  types: IType[] | undefined;
  brandIdSelected = 0;
  typeIdSelected = 0;



  constructor(private shopService: ShopService){}

  ngOnInit() {
    //Call the methods, so that they are available
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected).subscribe(response => {
      this.products = response!.data;
    }, error =>{
      console.log(error);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    })
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

}
