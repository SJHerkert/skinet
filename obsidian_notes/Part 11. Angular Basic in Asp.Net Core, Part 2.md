Overview: Continuation of previous part.

---

Observables
Typescript

---

Typescript
	Author going through the goods and bads of Typescript
Observables
	Interface for our products
		In swagger get json return from product{id} and convert from json to ts
		Add a new folder in app called models
			inside a new ts file called product.ts
				paste the converted json return in
					```
						export interface IProduct {
						id: number	
						name: string
						description: string
						price: number
						pictureUrl: string
						productType: string
						productBrand: string
						 }
					```
			inside new ts file called pagination
		Add provideHttpClient to AppConfig.ts also, otherwise page wont load.
		==Error(1)==
			CORS error, as it hasnt been setup yet.
				Added in API/Extensions/ApplicationServicesExtensions.cs the AddCors service. ('CorsPolicy')
				Added CORS to Program.cs
			Error resolved
		==Error(2)==
			Bad request
				 {errors: ["The Search field is required."], statusCode: 400, message: "A bad request you have made"}
					 errors: ["The Search field is required."]
					 message: "A bad request you have made"
					 statusCode: 400
				The search field is required is a reoccuring problem which results from the fact that there is a search field requirement in the api endpoint, or rather the interface has it, i can comment it out for now to see if i can get a response from my API
				In ProductsWithTypesAndBrandsSpecification commeted out the search part:
					```
					    public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams)
					        : base (x =>
					            // (string.IsNullOrEmpty(productParams.Search) || x.Name!.ToLower().Contains(productParams.Search)) &&
					            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
					            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
					            //Add filtering by brand and type
					        )
					    {
					```
				In ProductSpecParams commented out anything related to search:
					```
					    public int? BrandId { get; set; }
					    public int? TypeId { get; set; }
					    public string? Sort { get; set; }
					    // private string? _search;
					    // public string Search
					    // {
					    //     get => _search!;
					    //     set => _search = value.ToLower();
					    // }
					```
				In ProductsWithFiltersForCountSpecification commented out anything related to search:
					```
						using System;
						using Core.Entities;
						namespace Core.Specifications;
						public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
						{
						    public ProductsWithFiltersForCountSpecification(ProductSpecParams productParams) : base(x =>
						        // (string.IsNullOrEmpty(productParams.Search) || x.Name!.ToLower().Contains(productParams.Search)) &&
						        (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
						        (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId))
						    {
						    }
						}
					```
				And we can!
					![[Pasted image 20250415191129.png]]
			Error resolved, but this will need proper attention in the future.

---

Errors(1,2)

---
*Start Date: 15.04.2025
*End Date: 15.04.2025*
*Time Spent: 2h*
*Tutorial Video length: 39min*

*About time management:* 
"Some time used to fix errors that arised."

---
*Tutorial link:*
*[Angular Basic in Asp.Net Core continue Part 11](https://www.youtube.com/watch?v=wRoeIi4TCMI&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=12)*

*Related links:*
*[RxJS - Subscribe Arguments](https://rxjs.dev/deprecations/subscribe-arguments)*