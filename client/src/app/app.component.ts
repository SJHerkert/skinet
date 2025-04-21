import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';


//Decorator
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  toastContainer: ToastContainerDirective | undefined;

  constructor(private toastrService: ToastrService){}

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
  }
  onClick() {
    this.toastrService.success('in div');

  }
}

