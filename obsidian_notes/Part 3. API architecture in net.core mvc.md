Overview: Exploring API architecture.

---

Application architecture
The Repository Pattern
Extending the Product Entity
Related data
Seeding Data
Migrations and Startup

----
Application architecture
	API
		Controllers
	Infrastructure
		Repository
		DbContext
		Services
	Core
		Entities
		Interfaces
Repository Pattern
	Decouple business code from data access
	Separation of concerns
	Minimize duplicate query logic
	Testability
		easier to do a mock of repository than of a dbcontext
Repository Pattern - Consequences
	Increased level of abstraction
		Controller - Repository - DbContext
			Repository is abstracted from DbContext, but as it's in the middle it's fine
	Increased maintainability, flexibility, testability
		easier to maintain our repositories tha it's to maintain our controllers with dbContext injected into the controllers
	More classes/interfaces - less dublicate code
	Business logic moves further away from the data
	Harder to optimise certain operations against the data source

--Create a repository--
create an interface for the repository first, this forms a contract with the actual repository we are going to create, the interface specifies what methods we are going to support in that particular repository.
	Interfaces are going to Core folder,
		New folder Interfaces in Core
			New c# class in Interfaces
				IProductRepository.cs
					public interface IProductRepository
					==Note(1)==
						No need to bring in using.system.threading.tasks; nor using.systems.collections.generic.
					==Note(2)==
						Using IReadOnlyList is used as we dont need all the functionality of the List. We can be more specific as we only return the list 
Create a concrete class that is going to implement this interface
	in Data folder -> new class ProductRepository.cs
		implement interface
			public class ProductRepository : IProductRepository...
	to be injectable to other classe, specicifically into our controllers, we need to add this as a service to our startup class, in this case it's program.cs.
		The lifetime for this service is AddScoped
			builder.Services.AddScoped
			![[Pasted image 20250331131313.png]]
Repository methods
	Repository methods interact with our DbContext, and our controllers use repository methods to retrieve data from our database.
		Repository abstracts the methods away from controllers.
	Constructor for ProductRepository
Replace ProductsController storecontext with our repository
	![[Pasted image 20250331132540.png]]

Check in Postman everything returns as expected - check.
*tutorial 23min, used time 2h*

--Extending the Product Entity--
	Extend entities to resemble actual products
	Seed some data
Create in core/entities
	BaseEntity.cs class with only id property
	Make Product.cs inherit from BaseEntity
		remove id as it has id property inherited from BaseEntity
	Add properties to Product.cs
		![[Pasted image 20250331134837.png]]
	Add two new classes ProductBrand.cs and ProductType.cs
		In these inherit from BaseEntity
			As theres only an id from BaseEntity they get the id parameter
			This helps the ef to set up foreign keys accordingly
In order to query the ProductType and ProductBrand tables we must add them as DbSets in the Infrastructure/Data/StoreContext.cs
	![[Pasted image 20250331135301.png]]

Creating the Migration
	Clean initial migration and create a new one
	We need to specify to Entity Framework what project does what, as we have three projects.
	Drop our database:
		 dotnet ef database drop -p Infrastructure -s API
	Remove existing migrations(Migrations folder in Infrastructure)
		 dotnet ef migrations remove -p Infrastructure -s API
	Generate a new migration(This will generate the tables based on our classes(which we modified))
		dotnet ef migrations add InitialCreate -p Infrastructure -s API -o Data/Migrations
		-p means the project
		-s means the startup project
Configuring our Migrations (fex. if we want to enforce non nullables)
	Create in Infrastructure/Data a new folder called Config
		In Config create a class called ProductConfiguation.cs
			![[Pasted image 20250331142233.png]]
==Note(3)==
	SQLite, per tutorial mentions that it does not support decimals, is this the case even today, anyways the configuration file should work for now
Tell our StoreContext there are configurations to look for
	In StoreContext.cs
		![[Pasted image 20250331142623.png]]

Removing Migrations after making the configuration file.
	dotnet ef migrations remove -p Infrastructure -s API
	dotnet ef migrations add InitialCreate -p Infrastructure -s API -o Data/Migrations
	Now checking the InitialCreate migration file we can see these configs have been used in the migration.

*tutorial 46min, used time 3h* 

--Creating our database--
Applying our migration as we start the application.
	==Tutorial Issue(1)==
		Seems that due to difference in program.cs vs startup.cs this part of the tutorial could be too much of a challenge. Updated the database using dotnet command:
			dotnet ef database update
	Using copilot for differentiating the difference in having startup.cs and program.cs vs just program.cs the suggested code is as follows:
	
		using Microsoft.EntityFrameworkCore;
		using Infrastructure.Data;
		using Core.Interfaces;
		
		var builder = WebApplication.CreateBuilder(args);  
		
		// Add services to the container(dependency injection container(DI)).
		
		builder.Services.AddScoped<IProductRepository, ProductRepository>();
		
		builder.Services.AddControllers();
		
		// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
		
		builder.Services.AddOpenApi();  
		
		builder.Services.AddDbContext<StoreContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));  
		
		// Add logging
		builder.Logging.ClearProviders();
		builder.Logging.AddConsole(); 
		
		var app = builder.Build(); 
		
		using var scope = app.Services.CreateScope();
		var services = scope.ServiceProvider;
		try
		{
		    var context = services.GetRequiredService<StoreContext>();
		    context.Database.Migrate(); // Applies pending migrations
		}
		catch (Exception ex)
		{
		    var logger = services.GetRequiredService<ILogger<Program>>();
		    logger.LogError(ex, "Migration failed in {Environment}. Exception: {ExceptionMessage}", app.Environment.EnvironmentName, ex.Message);
		    Environment.Exit(1); // Exits the application if migrations fail critically
		} 
		
		// Configure the HTTP request pipeline.
		if (app.Environment.IsDevelopment())
		{
		    app.MapOpenApi();
		} 
		
		app.UseHttpsRedirection();
		app.UseAuthorization();
		app.MapControllers();
		app.Run();
In this way it seems to be working, outcome is that no migrations made as its up to date. There is still no data, as expected.

==DIY(1)==
	Made a new folder DI in API, in here ApplyMigrations.cs
		inside is the migration logic during startup
	In tutorial we use async, will have to modify program.cs to be async:
		![[Pasted image 20250331164255.png]]

*tutorial 53min, used time 4h*

Seed Data
Using from the StudentsAssets folder the SeedData
	We have json and csv files.
	Copy files to newly created folder in Infrastructure/Data/SeedData
		brands.json
		types.json
		products.json
	Create the StoreContextSeed.cs class in Infrastructure/Data
		 ![[Pasted image 20250331172649.png]]
	In ApplyMigrations.cs in API/DI
		![[Pasted image 20250331172801.png]]
		Add             await StoreContextSeed.SeedAsync(context, loggerFactory); &             var loggerFactory = services.GetRequiredService/ILoggerFactory/();
Data succesfully in database.
Check using Postman - *success*

*tutorial 1.05h, used time 5h*

Update IProductRepository.cs
Update ProductRepository.cs
	implement interface
	update code
Update and make methods in ProductsController.cs
	Wrap return around Ok(X) response as its a quirk of asp.net. It doesn't allow us to directly return an IReadOnlyList. 

Solving the null return problem in the produttype and productbrand when httpget
	![[Pasted image 20250331183732.png]]

Pushing Changes to GitHub
	 git add .
	 git commit -m "End of Section 3"
	 git push origin main

Section done.

*tutorial 1.20h, used time 6h*

Summary
"Implemented repository, interfaces, added service to our DI container, able to return products, laying the foundations, way of seeding data, csv to json so basically data from a spreadsheet."

---

***dotnet commands:***
	dotnet ef database drop -p Infrastructure -s API
	dotnet ef migrations remove -p Infrastructure -s API
	dotnet ef migrations add InitialCreate -p Infrastructure -s API -o Data/Migrations
	dotnet ef database update

***Git commands:***
	 git add .
	 git commit -m "End of Section 3"
	 git push origin main	


---

Tutorial Issues(1,)
Notes(1,2,3,)
DIY(1,)

---
*Start Date: 31.03.2025
*End Date: 31.03.2025*
*Time Spent: 6h,*
	*Setup: *
	*Notes *
	*Video*
*Tutorial Video length: 1h22min*

*About time management:* 
"A little longer than expected."

---
*Tutorial link:*
*[API Architecture in .net core mvc part 3](https://www.youtube.com/watch?v=bMf1MqsK3Ko&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=4)*

*Related links:*
*Interesting links:*
