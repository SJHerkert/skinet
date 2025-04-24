import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5079/api/';
  pagination?: IPagination<IProduct[]>;
  shopParams = new ShopParams();
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<IPagination<IProduct[]>>{
    let params = new HttpParams();
    params = params.append('search', shopParams.search || "");
   
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    // Always append `search`, even if it's empty
    if (shopParams.search?.trim()) {
      params = params.append('search', shopParams.search.trim());
      console.log('Search parameter appended:', params.toString());
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination<IProduct[]>>(this.baseUrl + 'products', {params})
      .pipe(
        map(response => {
          this.pagination = response;
          return response;
        })
      )
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

  // setShopParams(params: ShopParams) {
  //   this.shopParams = params;
  // }

  // getShopParams() {
  //   return this.shopParams;
  // }
}
