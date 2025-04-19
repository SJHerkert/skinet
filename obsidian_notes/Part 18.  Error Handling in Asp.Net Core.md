Overview: Error handling on client side. Module 11.
Additional Note: From this part forward I will be incorporating Chat notes as well. The idea behind these is to show that, using AI as a learning tool, that you can bounce ideas off, can be beneficial. 

---

Error handling
Http Interceptors

---

9.30->
Error handling
	Idea is to make in angular or client side a set of errors, that can be displayed if there is an error in the request to the API. Instead of showing the error only in browser debugging, we want to display a page. We will have the pages ready, and later we'll use interceptor that can tap into req and res from/for the api. As such we see if there is an error status and if there is an error status, we then redirect the client to an error page. We will use router to redirect our client tot the appropriate page. But for now we create some test errors and navigation to test the UI and the error pages wanted.
	Testing error handling, using the error controller in our api
		In our src/app/core
			ng g c test-error --skip-tests
		Add the route to the created TestError component in app.routes.ts
		Add a link to navbar template, so that we can access our TestError component
	What we have now:
		test error component, route, and navbar link
	In tutorial the author suggests we shouldn't hard code our url's in our code. So we change that:
		We need to configure our environments.ts file, which doesn't exist:
		==Tutorial Issue(1)==
			In Angular version 19, we don't have environments ready set up so we need to do that first so we can configure it. We can use angular.json, but using environments will help us to setup different settings for our different builds. Check the link about environments in angular 19 below in the link section.
		Create environments
			ng g environments
				This creates us two(2) files called environment.development.ts and environment.ts
			==Note(1)==
				Difference in tutorial environments file (Remember the tutorial is made using Angular 8, so many things have possibly changed, this seems to be one of them), in tutorial the files found are named environment.ts and environment.prod.ts, in our Angular 19 version we have different naming. Somethig maybe being aware of if switching from versions.
			In our development file add:
				```
				export const environment = {				
				    production: false,				
				    apiUrl: 'https://localhost:5079/api/'				
				};
				```
			Add the import to test-error.component.ts
				```
				import { environment } from '../../../environments/environment.development';
				```
			Add baseUrl = environment.apiUrl
			Now we should have the defined apiUrl as a usable string
		As our angular.json contains fileReplacements section, the environment.ts is replaced with environment.developement.ts. But it seems that by only importing the eenvironment in test-error.component, will result in it's incapability to acces the modifier, I can add the apiUrl to the environment, this will give me acces, yet I feel like if the fileReplacement would work properly I shouldn't need to do this. As such maybe it is something to do with the accessibility at the IDE, that angular doesn't "run" and such cannot fetch the api dynamically? I'll just define it in the environments, and not in the environments.developement for now.
		==Chat==
			Wow in the tutorial it had the environments already ready to go, but it seems Ang 19 hasnt, so they have omitted the environments from the start, and as such is left to thedev to create these, so propably due to that the dev has a quick ready to run app, without the need to differentiate or introduce the idea of dev environment or production environment.
				You're absolutely right, Simon! Angular seems to have taken a slightly different approach in version 19 by simplifying things for developers to quickly get started without immediately delving into environment configurations. This could indeed be a deliberate choice to reduce complexity for newcomers or create a minimal, ready-to-run app template right out of the box.
				By leaving the environment setup to the developer, it gives more flexibility to customize the project based on specific needs. For example, while more advanced projects often require distinct dev, staging, and production environments, simpler projects may not need such separation right away.		
				For developers who want to add environment files, it's as easy as using the `ng generate environments` command. This creates the necessary environment files and configurations. Once set up, they can leverage the flexibility Angular offers with file replacements and different build configurations.				
				It’s interesting how they’ve shifted towards giving developers more autonomy. What’s your take on it—do you feel it’s a step forward, or does it make things slightly more cumbersome?
	Adding four different methods for all the errors we should be receiving in test-error.components.ts
		```
		get404Error() {
		    this.http.get(this.baseUrl + 'products/42').subscribe(response =>{
		      console.log(response);
		    }, error => {
		      console.log(error);
		    })
		  }
		  get500Error() {
		    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response =>{
		      console.log(response);
		    }, error => {
		      console.log(error);
		    })
		  }
		  get400Error() {
		    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response =>{
		      console.log(response);
		    }, error => {
		      console.log(error);
		    })
		  }
		  get400ValidationError() {
		    this.http.get(this.baseUrl + 'products/fortytwo').subscribe(response =>{
		      console.log(response);
		    }, error => {
		      console.log(error);
		    })
		  }
		```
	Making in the error component template some buttons to fire these methods.
	==Error(1)==
		The created get500Error, return null, should return a status error that matches the one in the API.
		null
		![[Pasted image 20250419115520.png]]
		Testing this error 500 response in swagger, it is clear that the error doesn't return the error it is supposed to, as no error status is received, it is null.
			We get back Status 200 OK,
			![[Pasted image 20250419115759.png]]
			Correct response would be the error we have defined in our API, for reference the errors we have defined:
				400 => "A bad request you have made",
				401 => "Authorized, you are not",
				404 => "Resource found, it was not",
				500 => "Errors are the path to the dark side. Errors lead to anger. Anger leads to hate. Hate leads to career change",
			And the type of a response we are looking, but retuning the 500 Error
			![[Pasted image 20250419115944.png]]
			I will now delve into the issue of my API return.
			The culprit is expected to be HttpGet"servererror" inside our BuggyController.cs in API side of things.
				```
					[HttpGet("servererror")]
					public ActionResult GetServerError()
					{
						var thing = storeContext.Products.Find(42);
						var thingToReturn = thing?.ToString();
						return Ok();
					}
				```
			This returns us Ok no matter what. It is okay.
			The solution, as we are trying to get a null error, I cannot make it a nullable, as it misses the point. I have previously gone through the list of my problems and corrected them all, as such this problem should have been left alone, as it is a made problem. So by removing the ? operator we let the error do it's real error.
			This should work now.
			And we do get the desired error on the client side.
			Updated servererror buggy api endoint:
				```
				    [HttpGet("servererror")]
				    public ActionResult GetServerError()
				    {  //TryCatch Try:If no error then return 200, if error catch and return 500
				    try
				        {
				            var thing = storeContext.Products.Find(42);
				            // Deliberate error, ignore
				            var thingToReturn = thing.ToString();
				            return StatusCode(200, "This shouldn't be OK, as the error is done on purpose! Check your method!?");
				        }
				        catch
				        {
				            //Return the error message from Errors/ApiResponse.cs 
				            return StatusCode(500, new ApiResponse(500));
				        }
				    }
				```
			Error solved 
	
->12.50
13.20->
Http Interceptors
	We will create templates for the 500, and 404 errors.
	In client core folder
		ng g c not-found --skip-tests
		ng g c server-error --skip-tests
		Add UI elements in both templates
			```
			<div class="container mt-5">
			<h1>Internal Server Error</h1>
			</div>
			```
			```
			<div class="container mt-5">
			<h1>Not Found Error</h1>
			</div>
			```
		Add the routing to these templates
			```
			{path: 'server-error', component: ServerErrorComponent},
			{path: 'not-found', component: NotFoundComponent},
			```
	We will use feature of angular, called http interceptors, part of angular httpmodule. We must setup a class that has these capabilities.
		Interceptor(catches http req res)
			If error=some specific error
				redirect user to corresponding error site
		==Tutorial Issue(2)==
			In tutorial there is no option to generate interceptors, but using the angular 19 we do. Ill delve into this next. In tutorial we find out that we're using the DI-based interceptors, per documents they work same as the functional ones, but are setup different.
		We will try to use the DI- approach to the interceptors per tutorial.
		In error.interceptor.ts
			```
			@Injectable()
			export class LoggingInterceptor implements HttpInterceptor {
			  constructor(private router: Router){}
			  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
			    console.log('Request URL: ' + req.url);
			    return handler.handle(req).pipe(
			      catchError(error => {
			        if (error) {
			          if (error.status === 404) {
			            this.router.navigateByUrl('/not-found');
			          }
			          if (error.status === 500) {
			            this.router.navigateByUrl('/server-error');
			        }
			      }
			      return throwError(error);
			      })
			    );
			  }
			}
			```
		Add our interceptor as a provider in our app.config.ts instead of app.module.ts
			```
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
			```
		And it's working.
		==Tutorial Issue(3)==
			Two things here:
			First, as per IDE the throwError style in  error.interceptor.ts per tutorial was depreciated,
			was:
				```
				}
				return throwError(error);
				})
				```
			is now:
				```
				}
				return throwError(() => new Error('test'));
				})
				```
			Secondly, the way the app.config.ts in tutorial is done is not up-to-date, per documentation the correction is below after the faulty one:
			was:
				```
				export const appConfig: ApplicationConfig = {
				  providers:
				  [provideZoneChangeDetection({ eventCoalescing: true }),
					 provideRouter(routes),
					 provideHttpClient(),
					 {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
				  ]
				};
				```
			is now:
				```
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
				```
->14.32

---

Angular commands:**
	*ng g c test-error --skip-tests*
	*ng generate environments*
	 *ng g c not-found --skip-tests*
	 *ng g c server-error --skip-tests*

---

Tutorial Issues(1,2,3)
Notes(1)
Errors(1)
Chat(1)

---
*Start Date: 19.04.2025
*End Date: 19.04.2025*
*Time Spent: 5h*
*Tutorial Video length: 27min*

*About time management:* 
"Time spent on going through Angular official documentation,matching that with the tutorial stuff, and implementing correct and up-to-date practices/syntax/parts."

---
*Tutorial link:*
*[(361) Error Handling in Asp.Net Core Part 18 - YouTube](https://www.youtube.com/watch?v=g7vDf5fYEuE&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=19)*

*Related links:*
*[Build environments • Angular](https://angular.dev/tools/cli/environments)*
*[interceptor • Angular](https://angular.dev/cli/generate/interceptor)*
*[Intercepting requests and responses • Angular](https://angular.dev/guide/http/interceptors)*
