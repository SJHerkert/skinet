Overview: Basket, Redis, Basket Repository & Controller, Setup and configure Redis, create supporting repository and controller

---

Redis Nugget Package to Infrastructure
Redis to Program.cs
Entities, Classes for Basket
Repository for Basket

---

Redis nugget package
	StackExchange.Redis (latest) for Infrastructure
		dotnet restore
Add redis in Program.cs
```
	       builder.Services.AddSingleton<ConnectionMultiplexer>(c =>
        {
            var configuration = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"),
            true);
            return ConnectionMultiplexer.Connect(configuration);
        });
```
Add "Redis" connection to appsettings.Development.json
```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },  

  "ConnectionStrings": {
    "DefaultConnection": "Data source=skinet.db",
    "Redis": "localhost"
  },
  "ApiUrl": "https://localhost:5079/"
}
```
Adding Classes for the Basket
	CustomerBasket.cs
	BasketItem.cs
Repository for Basket
	In Core/Interfaces add
		IBasketRepository
	In Infrastucture/Data add
		BasketRepository
	Add the repository service inside ApplicationServicesExtensions in API/Extensions
	Connect Redis to BasketRepository
	Modify methods

---
*Start Date: 28.05.2025*
*End Date: 28.05.2025*
*Time Spent: 2h*
*Tutorial Video length: 27min*

*About time management:* 
""

---
*Tutorial link:*
*[API Basket in Asp.Net Core part 22](https://www.youtube.com/watch?v=x23xH9SfHUo&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=23)*