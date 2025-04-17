import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagingHeaderComponent    
  ],
  exports: [
    PagingHeaderComponent
  ]
})
export class SharedModule { }
