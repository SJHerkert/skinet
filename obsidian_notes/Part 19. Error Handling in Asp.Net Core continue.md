Overview: Add a package that helps us display toasts.

---

Toastr

---

In client side install npm package
	npm install ngx-toastr --save
		--save this flag is no longer required as npm automatically saves the installed package to the _dependencies_ section by default
		==Note(1)==
			Tutorial versioning, just as a reminder. Tutorial uses toastr version 11, vs 17 that is latest.  Checking from toastr docs, it is compatible with angular 19.
Adding toaster in core.module.ts
	==Note(2)==
		Tutorial uses ngx.bootstrap, that has different names for their parts. As I used the ng.bootstrap, i have different part names than in tutorial. So taking this into account, I will find the corresponding part for ng-bootstrap. This is not a tutorial issue, and where needed I will in future notes refer to these differences only as Package or Version difference notes.
	Add Toast module from ng-bootstrap, this is called NgbToastModule.
	As found in Ng-bootstrap toast documentation:
		1. Create a global `AppToastService` to act as a global storage for toasts.
		2. Create a container component `<app-toasts>`, acting as the host in the application to display your toasts. You could use `<ngb-toast>` with an `@for` to read the list of toasts to display from the service.
		3. Finally, use this container component in your application.
	Steps done in my app.
	==Note(3)==
		The difference in NgbToaster(part of ng-bootstrap presumably), and ToastrModule(from ngx-toastr package) classes, I am missing funtionality needed, or would have to make them on my own. For now I will try to use the ngx instead, as per the tutorial.
			![[Pasted image 20250420152118.png]]
			vs. nothing with NgbToaster.
			Looking more into the difference, it seems that NgbToaster is much smaller in its' abillities, as in coded functionality. I could make a service, or a new module, that inherits from the NgbToaster, and seek out the missing code functionality from the ToastrService, and copy the functionality i want to the new module, then i would have access. Albeit interesting, I think there could be some errors or bugs later down the road, that would need more copying and implementing. As such i will still try to use the Ngx Toastr package and its funtionalities in it's classes.
	Add import for ToastrModule, add options->
		```
			ToastrModule.forRoot({
			positionClass: 'toast-bottom-right',
			preventDuplicates: true
		    })
		```
		Add in angular.json
			```
			"styles": [
			  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
			  ".node_modules/ngx-toastr/toastr.css",
			  "src/styles.scss"  
			],
			```
		Update error.interceptor.ts
Trying this out, results in error
	==Error(1)==
		Error: Build failed with 1 error:
		node_modules/ngx-toastr/fesm2022/ngx-toastr.mjs:3:59: ERROR: Could not resolve "@angular/animations"
		Checking the animations, it seems i don't have animations loaded in my application, in angular documentation of animations.
			Angular CLI: 19.2.7
			Node: 22.14.0
			Package Manager: npm 10.9.2
			OS: win32 x64			
			Angular: 19.2.6
			... common, compiler, compiler-cli, core, forms, localize
			... platform-browser, platform-browser-dynamic, router			
			Package                         Version
			---------------------------------------------------------
			@angular-devkit/architect       0.1902.7
			@angular-devkit/build-angular   19.2.7
			@angular-devkit/core            19.2.7
			@angular-devkit/schematics      19.2.7
			@angular/cli                    19.2.7
			@schematics/angular             19.2.7
			rxjs                            7.8.2
			typescript                      5.7.3
			zone.js                         0.15.0
		And i dont have the package installed
			npm install @angular/animations
				This resulted in a rather long list of errors, but this just refers to my ng.bootstrap and angular 19 version mismatch, but as I've explored the ng-bootstrap should be compatible with angular 19.
					npm error code ERESOLVE
					npm error ERESOLVE could not resolve
					npm error
					npm error While resolving: client@0.0.0
					npm error Found: @angular/core@19.2.6
					npm error node_modules/@angular/core
					npm error   peer @angular/core@"19.2.6" from @angular/common@19.2.6
					npm error   node_modules/@angular/common
					npm error     peer @angular/common@"19.2.6" from @angular/forms@19.2.6
					npm error     node_modules/@angular/forms
					npm error       peer @angular/forms@"^19.0.0" from @ng-bootstrap/ng-bootstrap@18.0.0
					npm error       node_modules/@ng-bootstrap/ng-bootstrap
					npm error         @ng-bootstrap/ng-bootstrap@"^18.0.0" from the root project
					npm error       1 more (the root project)
					npm error     peer @angular/common@"19.2.6" from @angular/platform-browser@19.2.6
					npm error     node_modules/@angular/platform-browser
					npm error       peer @angular/platform-browser@"19.2.6" from @angular/forms@19.2.6
					npm error       node_modules/@angular/forms
					npm error         peer @angular/forms@"^19.0.0" from @ng-bootstrap/ng-bootstrap@18.0.0
					npm error         node_modules/@ng-bootstrap/ng-bootstrap
					npm error         1 more (the root project)
					npm error       4 more (@angular/platform-browser-dynamic, @angular/router, ...)
					npm error     5 more (@angular/platform-browser-dynamic, @angular/router, ...)
					npm error   peer @angular/core@"19.2.6" from @angular/forms@19.2.6
					npm error   node_modules/@angular/forms
					npm error     peer @angular/forms@"^19.0.0" from @ng-bootstrap/ng-bootstrap@18.0.0
					npm error     node_modules/@ng-bootstrap/ng-bootstrap
					npm error       @ng-bootstrap/ng-bootstrap@"^18.0.0" from the root project
					npm error     @angular/forms@"^19.2.0" from the root project
					npm error   7 more (@angular/platform-browser, ...)
					npm error
					npm error Could not resolve dependency:
					npm error @angular/animations@"*" from the root project
					npm error
					npm error Conflicting peer dependency: @angular/core@19.2.7
					npm error node_modules/@angular/core
					npm error   peer @angular/core@"19.2.7" from @angular/animations@19.2.7
					npm error   node_modules/@angular/animations
					npm error     @angular/animations@"*" from the root project
					npm error
					npm error Fix the upstream dependency conflict, or retry
					npm error this command with --force or --legacy-peer-deps
					npm error to accept an incorrect (and potentially broken) dependency resolution.
					npm error
					npm error
					npm error For a full report see:
					npm error C:\Users\simon\AppData\Local\npm-cache\_logs\2025-04-20T12_56_05_905Z-eresolve-report.txt
					npm error A complete log of this run can be found in: C:\Users\simon\AppData\Local\npm-cache\_logs\2025-04-20T12_56_05_905Z-debug-0.
				As such I'm confident to install this package to the project.
					npm warn using --force Recommended protections disabled.
					npm warn ERESOLVE overriding peer dependency
					npm warn ERESOLVE overriding peer dependency					
					added 1 package, and audited 954 packages in 3s
			Angular CLI: 19.2.7
			Node: 22.14.0
			Package Manager: npm 10.9.2
			OS: win32 x64			
			Angular: 19.2.6
			... animations, common, compiler, compiler-cli, core, forms
			... localize, platform-browser, platform-browser-dynamic, router			
			Package                         Version
			---------------------------------------------------------
			@angular-devkit/architect       0.1902.7
			@angular-devkit/build-angular   19.2.7
			@angular-devkit/core            19.2.7
			@angular-devkit/schematics      19.2.7
			@angular/cli                    19.2.7
			@schematics/angular             19.2.7
			rxjs                            7.8.2
			typescript                      5.7.3
			zone.js                         0.15.0
			No errors present, ok ->
After these theres a RuntimeError:
==Error(2)==
	Definition:
		RuntimeError: NG0200: Circular dependency in DI detected for InjectionToken HTTP_INTERCEPTORS. Find more at https://angular.dev/errors/NG0200
	    at throwCyclicDependencyError (core.mjs:978:9)
	    at R3Injector.hydrate (core.mjs:2236:9)
	    at R3Injector.get (core.mjs:2119:23)
	    at injectInjectorOnly (core.mjs:1111:28)
	    at ɵɵinject (core.mjs:1117:40)
	    at inject (core.mjs:1202:10)
	    at module-BHk9jdTn.mjs:1884:28
	    at module-BHk9jdTn.mjs:1852:84
	    at runInInjectionContext (core.mjs:2418:12)
	    at module-BHk9jdTn.mjs:1852:46
	Okay so here's all the tried things to resolve this issue:
		Checking the versions and installations of Angular and NgxToastr.
		Removed angular node_module cache and reinstall
		Used angulars Injector in error.interceptors.ts, to separate the inputs
		Provided Animations
		Checked angular.json styles
	Taking a break from debuggin for now.
Checking Ngx Toastr documentations again, with a fresh set of eyes.
	In app.config.ts add
		```
		import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
		import { provideRouter } from '@angular/router';
		import { routes } from './app.routes';
		import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
		import { ErrorInterceptor } from './core/interceptors/error.interceptor';
		import { provideAnimationsAsync } from '@angular/platform-rowser/animations/async';
		import { provideToastr } from 'ngx-toastr';  
		export const appConfig: ApplicationConfig = {
		  providers:[
		    provideZoneChangeDetection({ eventCoalescing: true }),
		    provideRouter(routes),
		    provideAnimationsAsync(),
		    provideToastr({
		      timeOut: 10000,
		      positionClass: 'toast-bottom-right',
		      preventDuplicates: true,
		    }),
		    provideHttpClient(
		       // DI-based interceptors must be explicitly enabled.
		    withInterceptorsFromDi()),
		    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
		  ]
		};
		```
	In app.component.ts add
		```
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
		```
	In core.module.ts remove ToastrModule, as it's setup in stand alone in the app.config.ts
		```
		import { NgModule } from '@angular/core';
		import { CommonModule } from '@angular/common';
		import { NavBarComponent } from './nav-bar/nav-bar.component';
		import { TestErrorComponent } from './test-error/test-error.component';
		import { NotFoundComponent } from './not-found/not-found.component';
		import { ServerErrorComponent } from './server-error/server-error.component';
		@NgModule({
		  declarations: [],
		  imports: [
		    CommonModule,
		    NavBarComponent,
		    TestErrorComponent,
		    NotFoundComponent,
		    ServerErrorComponent  
		  ],
		  exports: [NavBarComponent]
		})
		export class CoreModule { }
		```
Error solved
==Note(3)==
As seen again, using CoPilot for debugging is okay but now it was useless. I think even CoPilot seems to realte to older not stand-alone angular versions, or at least mixes the two. Maybe I could try to feed the llm first the documentation and check if it can use that as a base to debug, nevertheless, going through the documentation myself seems to be a valid route.
Adding some logic to our error->
	If in our 400 validation error we have an errors array
		->throw the error back to our component and 
			->display the error in the page, rather than display the error only on the toastr message
	else if in our 400 validation error we don't have an errors array
		-> Display the error in toastr message
		error.interceptor.ts:
			```
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
			            if(error.error.errors) {
			              throw error.error;
			            } else {
			              //Display toastr message when this error is hit, include the error message in the popup.
			              this.toastr.error(error.error.message, error.error.statusCode)  
			            }      
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
				return throwError(() => error);
			      })
			    );
			  }
			}
			```
		test.error.component.ts:
			```
			  get400ValidationError() {
			    this.http.get(this.baseUrl + 'products/fortytwo').subscribe(response =>{
			      console.log(response);
			    }, error => {
			      console.log(error);
			      this.validationErrors = error.errors;
			    })
			  }
			```
		test-error.component.html:
			```
			<div class="container mt-5">
			    <button (click)="get500Error()" class="btn btn-outline-primary mr-3">Test 500 Error</button>
			    <button (click)="get404Error()" class="btn btn-outline-primary mr-3">Test 404 Error</button>
			    <button (click)="get400Error()" class="btn btn-outline-primary mr-3">Test 400 Error</button>
			    <button (click)="get400ValidationError()" class="btn btn-outline-primary mr-3">
			    Test 400 Validation Error</button>
			    <div class="row mt-5" *ngIf="validationErrors">
			        <ul class="text-danger">
			            <li *ngFor="let error of validationErrors">{{error}}</li>
			        </ul>
			    </div>
			</div>
			```
Internal Server Error
	After an Internal Server Error we must have acces to the error, if we just redirect, the error information is gone. We need a way to have this error, or the message with the redirect.
	Passing state through Router to a component we are redirecting to.
		How to pass the exception of a 500 error to the component?
		Passing states to the routes we are navigating.
		Navigation extras.
			*[NavigationExtras • Angular](https://angular.dev/api/router/NavigationExtras)*
		==Tutorial Issue(1)==
			The code seems broken, as the result is different, needs further exploration. I am having the routing, but the state seems to be consistent, no error message from debug console is forwarded
	==Error(3)==
		I am having the Router modules NavigationExtras routing properly, only thing i'm missing is the full error code that should be occurring. 
			What do I know
			Refresh removes the exception
			Error is present after redirect
			Stack trace is missing
		Could be a native way for asp.net to exclude stack trace from error response, if app is not in developement, there may be more to this though?
			[Enabling StackTrace in ASP.NET Core 9 ProblemDetails for Development Environments – devgem.io - devgem.io](https://www.devgem.io/posts/enabling-stacktrace-in-asp-net-core-9-problemdetails-for-development-environments)
		Delving back in to the backend, we have custom ExceptionMiddleware:
			```
			using System;
			using System.Net;
			using System.Net.Http.Headers;
			using System.Text.Json;
			using API.Errors;
			namespace API.Middleware;
			public class ExceptionMiddleware
			{
			    private readonly RequestDelegate next;
			    private readonly ILogger<ExceptionMiddleware> logger;
			    private readonly IHostEnvironment env;
			    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
			    {
			        this.next = next;
			        this.logger = logger;
			        this.env = env;
			    }
			    public async Task InvokeAsync(HttpContext context)
			    {
			        try
			        {
			            await next(context);
			        }
			        catch(Exception ex)
			        {
			            logger.LogError(ex, ex.Message);
			            context.Response.ContentType = "application/json";
			            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
			            var response = env.IsDevelopment()
			                ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace?.ToString())
			                : new ApiException((int)HttpStatusCode.InternalServerError);
			            var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
			            var json = JsonSerializer.Serialize(response, options);
			            await context.Response.WriteAsync(json);
			        }
			    }
			```
			From here we can see that we do include the ex.StackTrace if in developement. As we connect to the https://localhost:5079/ that is in appsettings.Developement.json I am guessing we do return the environment as environment.developement.
			I think i'm in a rabbit hole, as such providing the stacktrace might not be necessary here.

---

Node commands(0):***
	*npm install ngx-toastr --save*
	*npm install @angular/animations*

---

Tutorial Issues(1)
Notes(1,2,3)
Errors(1,2,3)

---
*Start Date: 19.04.2025*
*End Date: 20.04.2025*
*Time Spent: 6h*
*Tutorial Video length: 27min*

*About time management:* 
""

---
*Tutorial link:*
*[Error Handling in Asp.Net Core continue Part 19](https://www.youtube.com/watch?v=jy6SwwlTF98&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=20)*

*Related links:*
*[ngx-toastr - npm](https://www.npmjs.com/package/ngx-toastr?activeTab=versions)*
*[Animations • Overview • Angular](https://angular.dev/guide/animations)*
*[Angular powered Bootstrap](https://ng-bootstrap.github.io/#/components/toast/overview)*
*[NavigationExtras • Angular](https://angular.dev/api/router/NavigationExtras)*
*[Make It Easy: 3 simple ways to share data through angular route.](https://www.angulartutorial.net/2017/12/3-simple-ways-to-share-data-through.html)*
[Enabling StackTrace in ASP.NET Core 9 ProblemDetails for Development Environments – devgem.io - devgem.io](https://www.devgem.io/posts/enabling-stacktrace-in-asp-net-core-9-problemdetails-for-development-environments)

*Interesting links:*
*[Problem Details for HTTP APIs - RFC 7807 is dead, long live RFC 9457](https://blog.frankel.ch/problem-details-http-apis/)*
*[RFC 7807: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc7807)*
*[How to get a stack trace of a background thread in .Net - Andrew Rondeau](https://andrewrondeau.com/blog/2022/02/how-to-get-a-stack-trace-of-a-background-thread-in-net)*