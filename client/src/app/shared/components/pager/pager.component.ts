import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pager',
  imports: [NgbPaginationModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss'
})
export class PagerComponent {


  @Input() totalCount!: number;
  @Input() pageSize!: number;
  @Input() pageNumber! : number

  @Output() pageChanged = new EventEmitter<number>();

  onPagerChange(event: any): void {
    this.pageChanged.emit(event);
  }

}
