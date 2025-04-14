import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Decorator
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SkiNet';
}
