import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';

//Decorator
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SkiNet';

  //Inject http client
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('https/localhost:5079/api/products').subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    });  
  }
}

