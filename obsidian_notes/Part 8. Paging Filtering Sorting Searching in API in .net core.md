Overview: Sorting, Filtering, Searching, Paging and CORS.

---

Sorting
Filtering
Searching
Paging
CORS*

---

Pagination
	Performance
	Parameters passed by query string:
		/api/products?pageNumber=2&pageSize=5
	Page size should be limited
	We should always page results
Deferred Execution
	Query commands are stored in a variable
	Execution of the query is deferred
	IQueryable(T) creates an expression tree
	Execution:
		ToList(), ToArray(), ToDictionary()
		Count() or other singleton queries

Making specification class

Sorting
	We want to use the OrderByDescending(or similar), 
	We must add support for this is our specification so we can use them
	Send query to specification evaluator
	Use in our generic repository
		ISpecification
			add support for two additional expressions
				OrderBy & OrderByDesceding
		BaseSpecification
			Add expressions OrderBy & OrderByDesceding and methods OrderBy & OrderByDesceding
		Specification Evaluator
			Add OrderBy & OrderByDesceding Evaluators if not null...
		Products Controller
			Pass in GetProducts string sort from:
				ProductsWithTypesAndBrandsSpecification
					In here we specify the default sorting when returning from a request.
				==Tutorial Issue(1)==
					Postman returns error
					All code is same as in tutorial so possibe a version change error in tutorial vs. present day.
	Solved all nullable issues in the code for now, this didn't affect the postman error:
		```
			using System;
			using System.Linq.Expressions;
			namespace Core.Specifications;
			public class BaseSpecification<T> : ISpecification<T>
			{
			    public BaseSpecification()
			    {
			        Criteria = _ => true; // Default criteria (always true)
			        OrderBy = _ => default!;
			        OrderByDescending = _ => default!;
			    }
			    public BaseSpecification(Expression<Func<T, bool>> criteria)
			    {
			        Criteria = criteria;
			        OrderBy = _ => default!;
			        OrderByDescending = _ => default!;
			    }
			    public Expression<Func<T, bool>> Criteria { get; private set;}
			    public List<Expression<Func<T, object>>> Includes {get;} =
			        new List<Expression<Func<T, object>>>();
			    public Expression<Func<T, object>> OrderBy {get; private set;}
			    public Expression<Func<T, object>> OrderByDescending {get; private set;}
			    protected void AddInclude(Expression<Func<T, object>> includeExpression)
			    {
			        Includes.Add(includeExpression);
			    }
			    protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
			    {
			        OrderBy = orderByExpression;
			    }
			    protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression)
			    {
			        OrderByDescending = orderByDescExpression;
			    }
			}
		```
		vs earlier:
		```
			using System;
			using System.Linq.Expressions;
			namespace Core.Specifications;
			public class BaseSpecification<T> : ISpecification<T>
			{
			    public BaseSpecification()
			    {
			    }
			    public BaseSpecification(Expression<Func<T, bool>> criteria)
			    {
			        Criteria = criteria;
			        OrderBy = _ => default!;
			        OrderByDescending = _ => default!;
			    }
			    public Expression<Func<T, bool>> Criteria {get;}
			    public List<Expression<Func<T, object>>> Includes {get;} =
			        new List<Expression<Func<T, object>>>();
			    public Expression<Func<T, object>> OrderBy {get; private set;}
			    public Expression<Func<T, object>> OrderByDescending {get; private set;}
			    protected void AddInclude(Expression<Func<T, object>> includExpression)
			    {
			        Includes.Add(includExpression);
			    }
			    protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
			    {
			        OrderBy = orderByExpression;
			    }
			        protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescExpression)
			    {
			        OrderByDescending = orderByDescExpression;
			    }
			}
		```
	Also used ! in other null errors.
	Debuggin still the postman error.
	The Error:
		The error resolves itself if i run with break points and debugger. 
			==Copilot:==
				-A **timing issue**: Debugging may have introduced slight delays that resolved a race condition or timing bug.    
				-A **caching quirk**: If some state or cache was out of sync, running the code with breakpoints might have refreshed or reset something.    
				-A **temporary hiccup**: External dependencies (e.g., database connections, configuration issues) might have been temporarily unstable.
		The Error is back without:
			Only clue in terminal is: 
				warn: 
					Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware[3]
				    Failed to determine the https port for redirect.
			Solution (As per CoPilot suggestions):
				In postman the request was inadequate:
					was: {{url}}/api/products
					should've been: {{url}}/api/products?sort=nameas
				Also altering how the sort is used, as now it can be null, however, now it seems to return always the same result, but will continue tutorial and return to this if it is the case.
				Here is the conversation with CoPilot:
					==CoPilot:==
					It seems like the `sort` parameter is being treated as a required field in your API, and when it's not supplied in the request, your validation logic returns this error. Here's how to address this:	
					1. **Check Your Controller Action**:	
					- In your `GetProducts` method, verify if you have any attributes or validation logic that enforce `sort` as required. For instance:		
						csharp		
						```
						public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts([FromQuery] string sort)
						```	
					If you're using `[FromQuery] string sort`, ensure your frontend or Postman explicitly includes the `sort` parameter in the query string, even if it's just an empty value (e.g., `GET /api/products?sort=`).	
					1. **Handle Default Value for** `sort`:	
					- To ensure `sort` is optional, provide a default value in your method signature:
						csharp	
						```
						public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts([FromQuery] string sort = null)
						```		
					- This ensures that if no `sort` parameter is provided, its value will default to `null`.		
					1. **Debugging the Specification Class**:	
					- If the `sort` parameter isn't being passed properly, your `ProductsWithTypesAndBrandsSpecification` might not be constructed as intended. Ensure that:		
						csharp		
						```
						var spec = new ProductsWithTypesAndBrandsSpecification(sort ?? "default");
						```	
					Replace `"default"` with the fallback sorting behavior you'd like to apply.	
					1. **Validate the Postman Request**:	
					- Double-check the request URL in Postman. Ensure you're including the `sort` parameter, like:		
						```
						GET https://localhost:7272/api/products?sort=nameasc
						```		
					1. **Model Binding and Validation**:	
					- If you're using `[ApiController]` attribute on your controller, model binding automatically validates query parameters. You might need to adjust how `sort` is handled to avoid treating it as required.	
					Let me know how it goes after testing these changes! We’ll get to the bottom of this.	
					___
					==ME:==number 4 was right!
					___
					==CoPilot:==
					Glad to hear that worked, Simon! It's always the simplest tweaks, like double-checking the request in Postman, that can make all the difference. Sometimes these little details sneak past even the sharpest eyes. Great catch on your part! Let me know if anything else crops up—I'm here to help troubleshoot or celebrate the next victory. 🚀	
					___
					==ME:==	Can you explain this a little more? as in how does the postman requests relate to real world?	
					___
					==CoPilot:==
					Absolutely! Postman is a powerful tool for testing API endpoints, simulating real-world requests, and debugging issues. Here's how these requests in Postman relate to the real-world usage of your API:	
					### 1. **Simulating Client Requests**	
					- In the real world, APIs are typically consumed by applications like web frontends, mobile apps, or other backend services. Postman acts as a stand-in for these clients, allowing you to craft and send HTTP requests manually.	
					- For example, a user browsing an e-commerce site might select a sorting option like "price low to high." The front-end app would make a request like `GET /api/products?sort=priceasc`, which your API would process—exactly like you did in Postman.	
					### 2. **Verifying Integration**	
					- In a real-world scenario, various systems integrate with your API. For instance:	
					- A mobile app fetching sorted product data.		
					- Third-party services pulling information using your API.		
					- Postman helps ensure the API behaves as expected for all integrations—returning the correct data, handling errors gracefully, and following validation rules.	
					### 3. **Handling Input from Users**	
					- In production, your API must handle dynamic inputs from users or external services. For example:	
					- A customer selects a filter or sorting method while shopping.		
					- The API receives a `GET` request with query parameters like `?sort=priceasc`, and it must correctly interpret and apply the filter.		
					- Postman lets you mimic this behavior, helping you catch issues early.	
					### 4. **Error Handling and Validation**	
					- Postman allows you to test how your API responds to incorrect, missing, or unexpected inputs—like when `sort` wasn't provided and resulted in a `400 Bad Request`.	
					- In the real world, similar errors might occur when users submit incomplete forms or when a client application sends a malformed request.	
					### 5. **Debugging and Monitoring**	
					- Developers use Postman to trace request-response cycles, debug issues, and understand API behaviors. This mirrors how your API would operate in production when connected to monitoring tools or logs.	
					### Final Thought:	
					Think of Postman as your **API test lab**—where you can simulate real-world interactions safely and reliably before releasing your API to actual users and applications. It helps you ensure that everything works seamlessly when the real-world clients (apps, systems, users) start communicating with your API.	
					Let me know if you'd like more examples or clarifications! 🌟
					___
					==ME:== Thank you. Can you explain why previously using only /api/products/ worked but not anymore?
					___	
					==CoPilot:==
					You're welcome, Simon! The behavior you describe—where `/api/products/` worked previously but doesn't anymore—might be due to changes in your API's structure, client requests, or server configuration. Here are some common reasons this could happen:	
					### 1. **Default Parameters**	
					- Previously, your API might have had default logic to handle cases where the `sort` parameter wasn't explicitly provided in the request. For example, the `ProductsWithTypesAndBrandsSpecification` class could have sorted by name or applied a default sorting rule when `sort` was `null`.	
					- If that default behavior was removed or modified, the API now expects `sort` to be explicitly passed in the query string, resulting in a `400 Bad Request` error when it's missing.	
					### 2. **Breaking Changes in the Code**	
					- If the API code was updated recently (perhaps during refactoring or a version upgrade), the behavior might have changed:	
					- The `sort` parameter was made required unintentionally.		
					- Validation attributes or middleware now enforce stricter checks on query parameters.		
					- For example, the introduction of `[Required]` annotations or model-binding changes could have affected this.	
					### 3. **Changes in Framework or Runtime**	
					- Upgrading from ASP.NET Core 3.1 to .NET 9 could introduce subtle differences in default behavior for query parameter validation or routing. If these changes weren't accounted for, the application may now behave differently than it did previously.		
					### 4. **HTTP Client Behavior**	
					- When testing with Postman, missing query parameters in `/api/products` could previously have been handled gracefully by the API. Now, stricter validation rules might result in the `sort` parameter being required, especially if `[ApiController]` enforces default model binding validation.	
					### 5. **Environment-Specific Configuration**	
					- If you're running the application in different environments (e.g., Development, Production), there might be configuration differences affecting request handling. For example:	
					- URL rewriting or routing logic in the server settings might have changed.		
					- Middleware might behave differently across environments.	
					### How to Handle This:	
					To restore the previous behavior, you could:	
					- Add logic to make the `sort` parameter optional in your controller and specification classes (e.g., `string sort = null`).	
					- Implement default sorting behavior in the absence of `sort`.	
					- Verify if query parameter validation rules or middleware have been modified in recent code updates.	
					- Test different environments to identify discrepancies.	
					The beauty of APIs is that they evolve, but sometimes these little hiccups sneak in during upgrades or refactoring. Let me know if you'd like help digging further into the specifics! 🌟
					___	
					==ME: ==This seems to allow for me to request with both ways?: public async Task<ActionResult<IReadOnlyList<ProductToReturnDto GetProducts([FromQuery]string? sort = null)
					___	
					==CoPilot:==
					Yes, exactly, Simon! By setting `sort` as `string?` (nullable) and providing a default value of `null`, you're essentially making the `sort` query parameter optional. Here's how it enables both approaches:	
						1. **Without** `sort` **in the Request**:	
						- When you make a request like `/api/products`, the `sort` parameter defaults to `null`.
						- This ensures the API still works without requiring `sort`, allowing you to define fallback behavior (e.g., default sorting logic) in your code.		
						1. **With** `sort` **in the Request**:	
						- When you pass `/api/products?sort=nameasc`, the `sort` parameter is set to `"nameasc"`.	
						- Your code can then handle the sorting logic based on this value.	
					This approach improves flexibility and supports scenarios where clients may or may not specify the `sort` parameter. It's clean and aligns perfectly with real-world APIs where optional parameters are common. Great implementation—well done! Let me know if you'd like help refining or expanding this further. 🌟
	Continuing In the Products Controller
		Adding switch statements:
			priceAsc, priceDesc, and default(by Name)
		In Postman trying to sort the data by price results as an error, as SQLite doesn't support decimals.
			    "statusCode": 500,
			    "message": "SQLite does not support expressions of type 'decimal' in ORDER BY clauses. Convert the values to a supported type, or use LINQ to Objects to order the results on the client side."
		Convert our values to a supported type
			In StoreContext add a double conversion
	==Bug Issue(1)==
		Sorting by priceDescending seems to result in priceAscending
			In ProductsWithTypesAndBrandsSpecification:
			 case "priceDesc" was AddOrderBy -> should be AddOrderByDescending
Filtering
	Let the Client to sort by product Brand or product Type
	Because we are returing a Whee clause we can use our exisiting BaseSpecification and the  criteria, in SpecificationEvaluator we can see it's a Where clause.
	In ProductsWithTypesAndBrandsSpecification
		Add:
			public ProductsWithTypesAndBrandsSpecification(string sort, int? brandId, int? typeId) : base (x =>
			            (!brandId.HasValue || x.ProductBrandId == brandId) &&
			            (!typeId.HasValue || x.ProductTypeId == typeId)
	This will work for the filtering.
Pagination
	ISpecification:
		Properties for our pagination
			   int Take {get;}
			   int Skip {get;}
			   bool IsPagingEnabled {get;}
	Implement this in our BaseSpecification class
		From Ispecification implement interfaces
			    public int Take {get; private set;}
			    public int Skip {get; private set;}
			    public bool IsPagingEnabled {get; private set;}
				    Create methods to set the properties inside these:
					    Add protected void method called ApplyPaging
						        protected void ApplyPaging(int skip, int take)
						        {
						        Skip = skip;
						        Take = take;
						        IsPagingEnabled = true;
							}
		SpecificationEvaluator
			Add If statement:
				       if(spec.IsPagingEnabled)
				        {
				            query = query.Skip(spec.Skip).Take(spec.Take);
				        }
	Paging comes further in our query 	
	list because it wouldn't make sense to first paginate and then filter and sort the list.

==Tutorial Issue(2)==
	A video part is missing where we update our controller to use the pagination.

The pagination
	Going through the Authors sample project and doing a side by side analysis and finding out what the missing parts might have been.
	Add pagination helper class
	In ProductsController abstract productparameters
		In Core/Specifications add ProductSpecParams class
			Update ProductsWithTypesAndBrandsSpecification to use the productParams.
	Add ProductsWithFiltersForCountSpecification in Core/Specification
	Finally update the ProductsController
==Tutorial Issue(3):==
	It seems that the CORS part is also missing, could do a side by side analysis on the sample code vs. mine.

Added the lines from sample project gitignore, i had a fine .gitignore file but this seemed more robust and more lines of code.

Searching:
	In ProductsWithTypesAndBrandsSpecification add search
		(string.IsNullOrEmpty(productParams.Search) || x.Name!.ToLower().Contains(productParams.Search)) &&
	In ProductsWithFiltersForCountSpecification add
		(string.IsNullOrEmpty(productParams.Search) || x.Name!.ToLower().Contains(productParams.Search)) &&
	In ProductSpecParams add
		    public string Search
			    {
			        get => search!;
			        set => search = value.ToLower();
			    }
	If I comment these out then I will have pagination results in PostMan, with these I need to use &search=X in the request query

CORS:
	Extensions -> ApplicationSericesEtensions.cs -> check CORS
	Will leave this for now and dive into the client part of the tutorial.

==Note (1)==
	Postman refused to open, solution was to open a previous version from the file explorer, trying to open the newest postman.exe resulted i message that this version is not supported. Somehow when launching postman it redirects the execution request to the newest version, also postman had updated itself without aksing.
==Note (2)==
	warning NU1900: Error occurred while getting package vulnerability data: Unable to load the service index for source https://api.nuget.org/v3/index.json.
	==Copilot:==
		It seems you're encountering the **NU1900 warning** while working on your project. This warning typically occurs when NuGet is unable to retrieve vulnerability data from a package source. Here are some steps you can try to resolve this issue:
		1. **Check Network Connectivity**: Ensure that your internet connection is stable and that there are no firewall or proxy settings blocking access to `https://api.nuget.org/v3/index.json`.		    
		2. **Clear NuGet's HTTP Cache**: Run the following command in your terminal to clear the cache:		    
		    bash		    
		    ```
		    dotnet nuget locals http-cache --clear
		    ```
		3. **Retry After Some Time**: Sometimes, this issue can be temporary due to server-side problems. Waiting and retrying might help.		    
		4. **Check NuGet Configuration**: Verify your `nuget.config` file to ensure that the package source URL is correct and accessible.		    
		5. **Disable Vulnerability Auditing (if necessary)**: If the issue persists and you need a quick workaround, you can disable vulnerability auditing by adding the following property to your `.csproj` file:		    
		    xml		    		    ```
		    <PropertyGroup>		        <EnablePackageVulnerabilityAnalysis>false</EnablePackageVulnerabilityAnalysis>
		    </PropertyGroup>
		    ```		    
		6. **Contact NuGet Administrators**: If none of the above solutions work, you might need to reach out to the NuGet team or check their server status for any ongoing issues.	
		For more detailed information, you can refer to the official documentation or explore discussions on platforms like GitHub and Stack Overflow.	
		Let me know if you need further assistance!


---

***dotnet commands(1):***
dotnet nuget locals http-cache --clear
***Visual Studio Code commands(0)***	

---

Bug Issue(1)
Tutorial Issues(1,2,3)
Notes(1,2)

---
*Start Date: 08.04.2025
*End Date: 10.04.2025*
*Time Spent: 9h*
	*Setup: *
	*Notes *
	*Video*
*Tutorial Video length: 32min*

*About time management:* 
"Some issues throughout the tutorial."

---
*Tutorial link:*
*[Paging Filtering Sorting Searching in API in .net core part 8](https://www.youtube.com/watch?v=l89_K3Ll3D0&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=9)*

*Related links:*
*Interesting links:*