import { Component } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-carousel',
	imports: [NgbCarouselModule],
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss',
	providers: [NgbCarouselConfig],
})
export class CarouselComponent {
	images = ['hero1.jpg', 'hero2.jpg', 'hero3.jpg'].map((n) => `assets/images/${n}`);
}