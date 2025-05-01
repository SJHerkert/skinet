import { Component } from '@angular/core';
import { NgbCarouselModule, NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from '../core/carousel/carousel.component';


@Component({
  selector: 'app-home',  
  templateUrl: './home.component.html',
  imports: [CarouselComponent],
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
