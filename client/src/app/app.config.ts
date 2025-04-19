import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(
       // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),),
     {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
};
