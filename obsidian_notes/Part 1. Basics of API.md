Overview: Introduction to API basics.

---
API->Infrastucture->Core
	API - receive http request
	Infrastructure - DB communication queries, get data
	Core -  business entitties <-- (OO)

.Net cli
	make directory skinet
	create new solution
		dotnet new sln
		dotnet new webapi --use-controllers -o API
			this creates API folder, --use-controllers gives us template for controllers, without it it does not.
			[Tutorial: Create a controller-based web API with ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code)
==Tutorial issue(1)==: 
	Old code so the controllers were not created as in just an empy .net core webapi
	  Creating this template will make changes to existing files:
	  Overwrite   API\appsettings.Development.json
	  Overwrite   API\appsettings.json
	  Overwrite   API\API.csproj
	  Overwrite   API\API.http
	  Overwrite   API\Program.cs
	  Overwrite   API\Properties\launchSettings.json
	 To create the template anyway, run the command with '--force' option:
	  dotnet new webapi --use-controllers -o API --force

C# Dev Kit - extension install
	this allows for .Net: Generate Assets for build and debug in ctrl+shift+p window in vscode
	SQLite extension - allows for sqlite database manipulation(queryes etc.)

Test API connection using postman
	in terminal in API folder - dotnet run
	Enter local host to postman confirm that we have connection
		In tutorial trust issues, using dotnet commands gie dev-certs, my vscode seems to have trusted connection, perhaps from the popup of trust this folder that usually comes up when using or opening folders in VSCode

==Tutorial Issue(2):==
	No Startup.cs file as in tutorial(Uses .Net Core 3.1). After .Net 6 no Startup.cs
	[.NET 6 Startup Changes - Handling Program.cs Without Startup.cs](https://www.youtube.com/watch?v=vdhFw1VSowg)
		Notes from Tim Corey's video:
			Makes comparisons for blazor, mvc, webapi, wasm, .net 5 vs .net 6
	
==Note(1):==
	If i make a project from template it can configure the program.cs to match the needed parameters.I have a feeling that in the tutorial we dont define them, and being another structure, probably i will have to study the porgram.cs file more intensly as the tutorial goes on.

==Tutorial Issue(3):==
	In launchsettings some dissimilarities, as in missing API settings etc.

Making products controller class with api endpoints in /API/Controllers.
	-Using VSCode instead of Visual Studio a difference is in the availability of options when creating fex. a new class. But if we use C# extensions package provided by Microsoft, we have the ability to use Solution Explorer and from there if we click the add file button at the folder, we get a list of files to choose from.
	-Using postman to test the endpoints:
		http://localhost:5079/api/products/3223222 for single product endpoint
		http://localhost:5079/api/products/ for many products endpoint 
Making products entities class with properties in /API/Data.
Next: Configure DbContext, ORM using EntityFramework
	Making StoreContext class in Api/Data/
		StoreContext inherits from DbContext
		Install Microsoft.EntityFrameworkCore nugget
	DbCOntextOptions(connectionStrings)

==Note(2):==
	In tutorial in use is traditional before c#10 styled classes in Curly-Brace Style, but Modern way to write classes is File-Scoped Namespace:
	
	---traditional
	namespace API.Entities
	{
	    public class Product
	    {
	        public int MyProperty { get; set; }
	    }
	}
	---vs. modern
	namespace API.Entities;
	
	public class Product
	{
	    public int MyProperty { get; set; }
	}

---

***dotnet commands:***
	dotnet new sln 
	dotnet new webapi --use-controllers -o API
	dotnet sln add API
	dotnet sln list
	code .
	dotnet run
	dotnet dev-certs https
	dotnet dev-certs https -h
	dotnet dev-certs https -t
		(Trusting the HTTPS development certificate was requested. A confirmation prompt will be displayed if the certificate was not previously trusted. Click yes on the prompt to trust the certificate.
		Successfully trusted the existing HTTPS certificate.)
	dotnet watch run - same principal as nodemon in node.js
	dotnet --info
		used to check the version of our .net (host:9.0.3)

***Visual Studio Code commands***
	ctr+shft+p=commands like nugget add etc.
	ctrl + . = quick fix

---

Tutorial Issues(1,2,3)
Notes(1,2)

---
*Start Date: 21.03.2025*
*End Date: 21.03.2025*
*Time Spent: ~3hours*
	*Setup: 1h*
	*Notes 1h*
	*Video 1h*
*Tutorial Video length: 50min*

*About time management:* 
*New at using Visual Studio Code as IDE, getting used to UI and commands. Also, comparing tutorial versioning and comparing this to the latest .Net version, raises study areas not otherwise necessary. *

---
*Tutorial link:*
*[Basics of API Part 1](https://www.youtube.com/watch?v=l5qr2kBvhtE&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=2)*

*Related links:*
*[Tutorial: Create a controller-based web API with ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code)*

*Interesting links:*
*[Build AI and ML applications with .NET and C# | .NET](https://dotnet.microsoft.com/en-us/apps/ai)*
*[microsoft/Generative-AI-for-beginners-dotnet: Five lessons, learn how to really apply AI to your .NET Applications](https://github.com/microsoft/Generative-AI-for-beginners-dotnet)*