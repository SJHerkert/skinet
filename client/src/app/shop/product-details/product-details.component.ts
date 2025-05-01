import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';


@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct | undefined;
  loading: boolean = true;  // Start with loading state

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private bcService: BreadcrumbService){
    this.bcService.set('@productDetails', ' ')
  }

  ngOnInit(){
    this.loadProduct();
  }

  // loadProduct() {
  //   const id = this.activateRoute.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.loading = true;  // Set loading state before fetching data
  //     this.shopService.getProduct(+id).subscribe(
  //       product => {
  //         this.product = product;
  //         this.bcService.set('@productDetails', product.name);
  //         this.loading = false;  // Disable loading state after fetching
  //       },
  //       error => {
  //         console.log(error);
  //         this.loading = false;  // Disable loading state even on error
  //       }
  //     );
  //   }
  // }

  loadProduct() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id){
      this.shopService.getProduct(+id).subscribe(
        product => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);          
      }, error => {
        console.log(error);
      })
    }
  }

    // loadProduct() {
  //   const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
  //   if (id && id > 0){
  //     this.shopService.getProduct(id).subscribe(
  //       product => {
  //         this.product = product;
  //         this.bcService.set('@productDetails', product.name);          
  //     }, error => {
  //       console.log(error);
  //     })
  //   }
  // }

  // loadProduct() {
  //   this.shopService.getProduct (this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
  //   this.product = product;
  //   this.bcService.set('@productDetails', product.name);
  //   }, error => {
  //   console.log(error);
  //   });
  //   }


}
