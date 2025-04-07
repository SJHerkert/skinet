Overview:  Set things up so we can easily test our error responses that we send back from our server.

---

Http response errors
Error handlig and exceptions
Developer exception page
	Out of the box when in dev mode when we are doing things in our API
Customising the error handling
	Provide consistent error response for any kind of error
*part2*
Validation errors
	Opportunity for validation and a response
Middleware
	Add our own middleware to add into our pipeline that will catch any errors
Swagger
	Documentation about our API

---

Error handlig and exceptions
	New controller that acts as a base controller
	New buggy controller
		new costructor(StoreContext storecontext)
		add different httpget errors
	In order for our angular app to have good error responses we will shape the data etc.
	New folder in API project called Errors
		New class inside called ApiResponse
			```
			using System;
			namespace API.Errors;
			public class ApiResponse
			{
			    public ApiResponse(int statusCode, string? message = null)
			    {
			        StatusCode = statusCode;
			        Message = message ?? GetDefaultMessageForStatusCode(statusCode);
			    }
			    public int StatusCode { get; set; }
			    public string? Message { get; set; }
			    private string? GetDefaultMessageForStatusCode(int statusCode)
			    {
			        return statusCode switch
			        {
			            400 => "A bad request you have made",
			            401 => "Authorized, you are not",
			            404 => "Resource found, it was not",
			            500 => "Errors are the path to the dark side. Errors lead to anger.  Anger leads to hate. Hate leads to career change",
			            _ => null
			        };
			    }
			}
			```
	What if client hits an endpoint we actually don't have?
		We create a new controller called ErrorController
			In here we override the Routes we get from our baseapicontroller, and we specify route property, instead of using api we use:
				[Microsoft.AspNetCore.Mvc.Route("errors/{code}")]
			Create method IActionResult Error(int code)
				return new ObjecResult
			How to get this fired when a request comes to our API?
				via middleware
					in Program.cs
						   app.UseStatusCodePagesWithReExecute("/errors/{0}");
Developer exception page
			Adding exception message to an error message
				In Errors folder add ApiException class
				In API add folder middleware
					Add class ExceptionMiddleware.cs
					In Program.cs replace if app.environment.Isdevelopement...
					with:    app.UseMiddleware<ExceptionMiddleware();
					Now we get in postman a json parsed exception error message.
						Pascal vs Camel case

*end of tutorial part1*
*tutorial 38min used time 2h*

---

***dotnet commands(0):***
***Visual Studio Code commands(0)***	

---

Tutorial Issues(0)
Notes(0)

---
*Start Date: 05.04.2025
*End Date: 05.04.2025*
*Time Spent: 2h*
	*Setup: *
	*Notes *
	*Video*
*Tutorial Video length: 38min*

*About time management:* 
"Info on time management in this part"

---
*Tutorial link:*
*[Error Handling using API in .net core part 6](https://www.youtube.com/watch?v=qMPRXVSW66c&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=7)*

*Related links:*
*Any related links*

*Interesting links:*
*Any interesting links*