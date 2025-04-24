import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbComponent, BreadcrumbService } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-section-header',
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent implements OnInit{
  breadcrumb$: Observable<any[]> | undefined;

  constructor(private bcService: BreadcrumbService){
  }

  ngOnInit() {
    this.breadcrumb$ = this.bcService.breadcrumbs$;
  }

}
