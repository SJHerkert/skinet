import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { IProduct } from './models/product';
import { CommonModule } from '@angular/common';
import { IPagination } from './models/pagination';

//Decorator
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  products: IProduct[] = [];

  //Inject http client
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('https://localhost:5079/api/products').subscribe(
      (response: any) => {
        const pagination: IPagination = {
          pageIndex: response.pageIndex || 0,
          pageSize: response.pageSize || 0,
          totalCount: response.totalCount || 0,
          data: response.data || []
        };
        this.products = pagination.data;
    }, error => {
      console.log(error);
    });  
  }
}

