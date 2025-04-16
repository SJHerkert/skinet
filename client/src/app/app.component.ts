import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { ShopComponent } from "./shop/shop.component";

//Decorator
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SkiNet';

  constructor(){}

  ngOnInit(): void {
  }
}

