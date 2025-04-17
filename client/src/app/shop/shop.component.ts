import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from "./product-item/product-item.component";
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { IPagination } from '../shared/models/pagination';
import { PagingHeaderComponent } from '../shared/components/paging-header/paging-header.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, ProductItemComponent, PagingHeaderComponent, SharedModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  @ViewChild('search', {static: true}) searchTerm?: ElementRef;
  //static refers to the availability of the input, as the input is always available in out template 
  //and doesnt rely on any dynamic activity, we can say that our static is true
  products: IProduct[] | undefined;
  brands: IBrand[] | undefined;
  types: IType[] | undefined;
  shopParams = new ShopParams();
  totalCount!: number
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];


  constructor(private shopService: ShopService){}

  ngOnInit() {
    //Call the methods, so that they are available
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams)
    .subscribe(response => {
      this.products = response!.data;
      this.shopParams.pageNumber = response?.pageIndex;
      this.shopParams.pageSize = response?.pageSize;
      this.totalCount = response?.totalCount;
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
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: number):void {
    this.shopParams.pageNumber = event;
    this.getProducts();
  }

  onSearch() {       
      this.shopParams.search = this.searchTerm?.nativeElement.value;
          this.shopParams.pageNumber = 1;
      this.getProducts();                 
    }
  

  // onReset() {
  //   this.searchTerm.nativeElement.value = '';
  //   this.shopParams = new ShopParams();
  //   this.getProducts();  
  // }

  // onSearch() {
  //   if (this.searchTerm?.nativeElement) {
  //     const searchValue = this.searchTerm.nativeElement.value.trim();        
  //     this.shopParams.search = searchValue;
                 
  //   }
  // }

  onReset() {
    if (this.searchTerm?.nativeElement) {
      this.searchTerm.nativeElement.value = ""; // Reset search value
    }
    this.shopParams = new ShopParams(); // Reset all filters
    this.getProducts();
  }
  
  // onPageChanged3(event: number): void {
  //   const testEvent = 2; // Replace with a valid page number
  //   console.log('Testing with:', testEvent);
  //   this.shopParams.pageNumber = testEvent;
  //   this.getProducts();
  // }

  // onPageChanged(event: any) {
  //   const params = this.shopService.getShopParams();
  //   if (params.pageNumber !== event) {
  //     params.pageNumber = event;
  //     this.shopService.setShopParams(params);
  //     this.shopParams = params;
  //     this.getProducts();
  //   }
  // }
}
