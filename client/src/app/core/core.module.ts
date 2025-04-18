import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShopModule } from '../shop/shop.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarComponent,
    ShopModule   
  ],
  exports: [NavBarComponent]
})
export class CoreModule { }
