import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService){}

  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    return handler.handle(req).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {
            //Display toastr message when this error is hit, include the error message in the popup.
            this.toastr.error(error.error.message, error.error.statusCode);            
          }
          if (error.status === 401) {
            //Display toastr message when this error is hit, include the error message in the popup.
            this.toastr.error(error.error.message, error.error.statusCode);            
          }
          if (error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            this.router.navigateByUrl('/server-error');
        }
      }
      return throwError(() => new Error('test'));
      })
    );
  }
}