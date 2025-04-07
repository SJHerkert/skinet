Overview: Continuation of generic repository implementation.

---

Generic Repository
Specification pattern
Using the specification pattern
 - *tutorial part1 ends here*
Using the debugger
Shaping data
AutoMapper
Serving static content from the API

---
Walkthrough theoretically(Step by step how we get the product type and brand using our specification and general repostory):
When the endpoint gets "hit"
	HttpGet("{id}")
		We Pass in the ID
		Create new instance of the ProductsWithTypesAndBrandsSpecification
		Pass in the ID
			Because we have id we are going to hit the constructor with id
			We also are creating a new instance of our BaseSpecification because we are calling : base and passing it this particular criteria
		Inside BaseSpecification we call in to constructor
		We pass into criteria whatever its expression is
		In ProductsWithTypesAndBrandsSpecification we pass in the expression
			The expression: Get me the products that matches the id that i pass into the constructor
				The expression: Get me the product where id is equal to the id passed into the constructor
			Also include product type and product brand
				We have replaced the generics with actual expressions
		In ProductsController
			Next step is to go to productsRepo and
			GetEntityWithSpec() and
			Pass in the specification (spec) we've created along with the expressions
				To our products repository, or our generic repository in this case
			In GenericRepository(look around)
				GetEntityWithSpec()
					pass in our spec (we now know what this contains)
						It contains: our Where clause(what we want to get with the Id) as well as our include expressions
					ApplySpecification()
							In this method we are going to hit our GetQuery method in our SpecificationEvaluator
						GetQuery
							Return us an IQueryable
								We are passing the Db.Set
									which is going to be the product db.Set
								We are also passing the specification to our SpecificationEvaluator
							In SpecificationEvaluator
								Passed it the IQueryable(TEntity) which is our db.set of type product
								Because its a db.set we can use data context or the DB context methods
								As such we can actually then apply the queries into our expression
									Check if criteria is null
										It's not as we know we've got the id
											Hit query method
												Add Where query to our query
													Where the id is equal to the product id
											Hit another method
												Aggregates our iclude expressions, its going to include the type and brand from product
													return query -> we go back to our generic repository
				We now have an IQueryable with those expression that we ca pass down to our database
					FirstOrDefaultAsync()
						Execute the queries and return the data from the database
						return -> we go back to our ProductController
			return product with the types and brands

*tutorial 17min, used time 1h* 

Using the debugger
	Create breakpoint
	In debug tab attach core
	Hit play search for API - select
	Go step by step while dotnet run, follow the path how all is fetched and gathered before the request to db is made.

Shaping Data (AutoMapper)
	DTO -Data Transfer Object
		New folder in API - Dtos
			New class in Dtos folder called ProductToReturnDto
		DTO is a container to move data between layers
			In our GetProduct in our controller modify to return our ProductToReturnDto
			Do the same to GetProducts as well
		We get our flattened object with the properties we want
			Easier for client to use the data
	AutoMapper
		==Tutorial Issue(1)==
			In this tutorial VSCode has changed and as we install a nugget package we define first in which project we want to install the package, but in tutorial VSCode it asks it lastly after the nuget has been selected.
		Install AutoMapper.Extensions.Microsoft.DepencyInjection
			dotnet restore
			New folder in API called Helpers
				New class inside called MappingProfiles
				Add AutoMapper to our Program.cs as a service
				Update GetProduct in ProductController to use AutoMapper
					Due to Automapper we need to tell it how we want our brands and types to be returned.

*tutorial 37min, used time 2h* 

Shaping Data(AutoMapper) - *Continuing*
	Fixing image url
		Automapper doesnt work in here the same way as previously.
		In appsettings.Developement.json add  "ApiUrl": "https://localhost:5079"
		Custom Value Resolver
			Create a helper class
				In Helper folder ProductUrlResolver.cs
					public class ProductUrlResolver : IValueResolver<(1)Product, (2)ProductToReturnDto, (3)string>
						IValueResolver comes from automapper
						Then specify the types - 
							(1)The source where we want to map from
							(2)Then where we want to map to
							(3)Then what we want the destination property to be
							because IValueResolver is an interface -> implement interface
							Our code for Resolve:
								    public string? Resolve(Product source, ProductToReturnDto destination, string? destMember, ResolutionContext context)
									    {
									        if(!string.IsNullOrEmpty(source.PictureUrl))
									        {
									            return configuration["ApiUrl"] + source.PictureUrl;									
									        }
									        return null;									
									    }
				Constructor so that we can inject our configuration
					Microsoft Iconfiguration
						Initialize field from configuration
						==Tutorial Issue(2)==
							The type 'API.Helpers.ProductUrlResolver' cannot be used as type parameter 'TValueResolver' in the generic type or method 'IMemberConfigurationExpression<Product, ProductToReturnDto, string?>.MapFrom<TValueResolver()'. Nullability of type argument 'API.Helpers.ProductUrlResolver' doesn't match constraint type 'AutoMapper.IValueResolver<Core.Entities.Product, API.Dtos.ProductToReturnDto, string?>'.[CS8631](https://msdn.microsoft.com/query/roslyn.query?appId=roslyn&k=k\(CS8631\))
								Solution:
								In ProductUrlResolver add a ? after all string parts.
				In Postman we now return our whole url for pictureurl.

*tutorial 45min, used time 1,5h* 

Serving static content from the API
	New folder in API called wwwroot
		content inside is served as it is
		our static images will go here
		we will also serve our angular from here
	Copy student assets images folder in wwwroot
	Configure API server to serve static content
		Add as middleware
			ordering of middleware is important
			add app.UseStaticFiles(); under routing
			==Tutorial Issue(3)==
				In Postman:
					Error: write EPROTO 54455872:error:100000f7:SSL routines:OPENSSL_internal:WRONG_VERSION_NUMBER:..\..\..\..\src\third_party\boringssl\src\ssl\tls_record.cc:231:
					Solution:
						Restart server after Program.cs modifications

*tutorial 50min, used time 0,5h* 

Pushing Changes to GitHub
	 git add .
	 git commit -m "End of Section 4"
	 git push origin main

Section done.

*end of tutorial part2*
*tutorial 53min, used time 5h*

Summary of parts 4 and 5
"Created a generic repository, took a look at specification and implemented that in our application. Debugger. Shaping the data we return using Automapper. Serving static content from our API."

---

***dotnet commands(1):***
	dotnet restore
***Visual Studio Code commands(0)***	

---

Tutorial Issues(1,2,3)
Notes(0)

---
*Start Date: 02.04.2025
*End Date: 5.04.2025*
*Time Spent: 5h*
	*Setup: *
	*Notes *
	*Video*
*Tutorial Video length: 1.02h*

*About time management:* 
"This took longer again, but I've had other things to focus on at the moment so maybe it's acceptable."

---
*Tutorial link:*
*[Generic Repository using API in .net core part 4](https://www.youtube.com/watch?v=xy7rWCd6YqU&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=5)*

*Related links:*
*[Resolve nullable warnings - C# reference | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings?f1url=%3FappId%3Droslyn%26k%3Dk\(CS8631\))*
*Interesting links:*