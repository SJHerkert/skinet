import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './section-header/section-header.component';

@NgModule({
  declarations: [],
  imports: [
    NavBarComponent,
    SectionHeaderComponent,
  ],
  exports: [NavBarComponent, SectionHeaderComponent]
})
export class CoreModule { }
