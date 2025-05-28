Overview: Continuation of API basics.

---

API documentation seems to have changed some in tutorial .NET core 3.1 and .NET 9. At the start I'm going through the Microsoft documentation, just to have a better latest structure in mind before continuing the video series. So, going through API, OpenAPI, Web API with db'ses etc. From the get go we can see that the microsoft documentation on ASP.Net core in .Net 9.0 is very good. It seems to provide good precise code examples, clear writing and straight to the point. With many dive deeper links. Although I must mention, that I think in the documentation it's assumed the reader knows a lot as a base to tackle all these subjects. So maybe the documentation suitable best for intermediate programmer?

25.3->
Configure Db Context Configuration:
	IserviceCollection.Configure replace with AddDbContext
		==Tutorial Issue(1)==
			In the tutorial we use old startup.cs, which doesn't exist today. Configuring services and middleware is now handled in the Program.cs file.
		
	using Microsoft.EntityFrameworkCore;
	using API.Data;
	var builder = WebApplication.CreateBuilder(args);
	// Add services to the container(dependency injection container(DI)).
	builder.Services.AddControllers();
	// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
	builder.Services.AddOpenApi();
	builder.Services.AddDbContext<StoreContext>(options =>  options.UseSqlite(builder.Configuration.GetConnectionString("ConnectionStrings")));
	var app = builder.Build();
	// Configure the HTTP request pipeline.
	if (app.Environment.IsDevelopment())
	{
	    app.MapOpenApi();
	}
	app.UseHttpsRedirection();
	app.UseAuthorization();
	app.MapControllers();
	app.Run();

Generating migration using the ef tool
	 dotnet tool install --global dotnet-ef --version 9.0.202
	 dotnet ef migrations add InitialCreate -o Data/Migrations
	 Error, missing a package, install using nugget package manager ctrl+shft+p
		Microsoft.EntityFrameworkCore.Design
	run ef migrations again, build succeeded.
	![[Pasted image 20250325121149.png]]

Creating our database
	dotnet cli -> dotnet ef database -h -> dotnet ef database update

[SQLite - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)
SQLite Explorer
	==Tutorial issue(2)==
		Tutorial is from year 2020
	![[Pasted image 20250325122925.png]]
	![[Pasted image 20250325122953.png]]
	![[Pasted image 20250325123033.png]]
	![[Pasted image 20250325123048.png]]

26.3->
Update ProductsControllers (*tutorial 19.00*)
	Using ActionResult = somekind of http response status, 200 Okay response, or 400 bad request fex.

	public class ProductsController: ControllerBase
	{
	    private readonly StoreContext storeContext;
	    public ProductsController(StoreContext sContext)
	    {
	        storeContext = sContext;
	    } 	
	    [HttpGet]
	    public ActionResult<List<Product>> GetProducts(){
	        var products = storeContext.Products.ToList();
	        return Ok(products);
	    } 	
	    [HttpGet("{id}")]
	    public string GetProduct(int id){
	        return "single product";
	    }

	Using async:
		    [HttpGet]	
	    public async Task<ActionResult<List<Product>>> GetProducts(){	
	        var products = await storeContext.Products.ToListAsync();	
	        return Ok(products);	
	    }
		       [HttpGet("{id}")]	
	    public async Task<ActionResult<Product>> GetProduct(int id){	
	        return await storeContext.FindAsync(id);	
	    }
==Tutorial Issue(2)==
	In making the one product async api endpoint in productscontroller, an error is apparent at the id part of FindAsync(id), a solution from VSC part was to create a method inside StoreContext (Data/StoreContext.cs). Now I'm not sure if this is due to some changes beween versions but the http request seems to work nevertheless. An error of async not being possible for the created method is also currently present.  
		Resolved the issue: Here's the working code:
			[HttpGet("{id}")]
	
		    public async Task<ActionResult<Product>> GetProduct(int id)	
		    {	
		        var product = await storeContext.Products.FindAsync(id);	
		        if (product==null)	
		        {	
		            return NotFound();	
		        }	
		        return Ok(product);	
		    }

Setting up Postman, getting a collection from the skinet tutorial folder
	Contains all the tutorial Api calls, this is mainly to save time.
Create new class library (in skinet not API)
	dotnet new classlib -o Core
	dotnet new classlib -o Infrastructure
Add these to solution (in skinet not API)
	dotnet sln add Core/
	dotnet sln add Infrastructure/
Set up depencies 
	Our API project is going to need the depency on the Infrastructure project
	(in API folder, cd API in terminal)
	dotnet add reference ../Infrastructure
	cd..
	(in skinet folder go to Infrastructure folder, cd Infrastructure)
	dotnet add reference ../Core
	cd..
	(In skinet folder)
	dotnet restore
		![[Pasted image 20250326124407.png]]
Restructuring the solution, using Data,Infrastructure and API
	Move Entities Folder from API to Core project
	Move Data Folder from API to Infrastructure project
	Modify all namespaes to match the folder structure
	Take from API (api.csproj)the package references of efcore and sqlite and transfer them to the Infrastructure.csproj file. 
		![[Pasted image 20250326131822.png]]
	Go through files and confirm and resolve any errors, fex. in Program.cs file. etc.
	After adjusting the references us dotnet restore to make use of these.
	In the end build the sln to check for any errors. dotnet build ==(error(1))==**
		![[Pasted image 20250326132757.png]]
		dotnet list package
			![[Pasted image 20250326132955.png]]
		Probably non issue as this is referencing to the SQLite package that is used to query the sqlite db.

*Pausing tutorial at Timestamp at 43.00*

Adding the project to version control, using Git, also pushing it to remote repository.
	git status (skinet folder)
	git init
	Make gitignore file
		obj
		bin
		appsettings.json
		*.db*
	delete class1 files fom core and Infrastructure 
	Currently files are untracked we need to add them all into attract status
		git add . (files will be added to our source control repository)
		git commit -m "Initial Commit"
			All channges are committed to our source control
	Push all to remote repository
		Go to Github ->
			Create new repository (skinet)
			git remote add origin "http..."
			git branch -M main
			git push -u origin master
				Password?
Summary:
	Working API
	Three projects running in our application API->Inrastructure->Core

---

Tutorial issues(1,2)
Errors(1)
==Note(1):==
	template

---

***dotnet commands:***
	 dotnet tool install --global dotnet-ef
	 dotnet tool install --global dotnet-ef --version 9.0.202
	 dotnet ef migrations add InitialCeate -o Data/Migrations
	 dotnet ef database -h
	 dotnet ef database update
	 dotnet new -h
	 dotnet new classlib -o Core
	 dotnet new classlib -o Infrastructure
	 dotnet sln add Core/
	 dotnet sln add Infrastructure/
	 dotnet add reference ../Infrastructure
	 dotnet add reference ../Core
	 dotnet restore
	 dotnet build

***Visual Studio Code commands***:
	CTRL+SHIFT+P

***Git commands:***
	git status
	git init
	git add .
	git commit -m "Initial Commit"
	git remote add origin "http..."
	git branch -M main
	git push -u origin master
	

---

Tutorial Issues(1)
Notes(1)

---
*Start Date: 24.03.2025
*End Date: 27.03.2025*
*Time Spent: 2h+2h+1h*
	*Setup: *
	*Notes *
	*Video*
*Tutorial Video length: 59 min*

*About time management:* 
"A lot of time figuring out what has changed since the inception of the tutorial. Going through .Net documentation regarding the Program.cs vs in the tutorial the Startup.cs. Using a video tutorial it involves skipping and searching of relevant information."

---
*Tutorial link:*
[Basics of API Part 2](https://www.youtube.com/watch?v=2XfqurUxA8U&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=3)

*Related links:*
[Tutorial: Create a controller-based web API with ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-gb/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code)
[Create web APIs with ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-gb/aspnet/core/web-api/?view=aspnetcore-9.0)
*Interesting links:*
[Web API with ASP.NET and SQLITE — PART 1 | by Rashmi Milan | Medium](https://medium.com/@rashmilan/web-api-with-net-and-sqlite-part-1-e9fe01b83433)
[Best Practices for Using SQLite in .NET Web API with Dapper: A Comprehensive Guide for Developers | by Engr. Md. Hasan Monsur | ASP DOTNET | Medium](https://medium.com/asp-dotnet/best-practices-for-using-sqlite-in-net-dapper-a-comprehensive-guide-for-developers-ec8ef2d78224)
[Overview of OpenAPI support in ASP.NET Core API apps | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/overview?view=aspnetcore-9.0)
https://aka.ms/dotnet/rid-usage **
