import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { ProductItemComponent } from './product-item/product-item.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ProductItemComponent,
    ShopComponent,    
  ],
  exports : [ShopComponent]
})


export class ShopModule { }
