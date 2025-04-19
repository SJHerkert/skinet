import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment.development';


//Decorator
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SkiNet';

  constructor(){}

  ngOnInit(): void {


  }
}

