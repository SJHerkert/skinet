Overview: Start of module 9. UI for the client. File and folder structure, refactoring. Angular services. Filtering, pagination sorting and searching. Input and Output properties among components.

---

File and Folder structure
Angular Services

---

File and Folder structure
	App module
		Core Module
			Singletons (always available in our application):
				NavBar
		Shared Module
			Shared components:
				Anything we need to use in more than 1 feature module
		Feature Modules
			App Features:
				Feature we create will have its own module and routing
	Create core, shop and shared modules
		ng g m core
		ng g m shop
		ng g m shared
	In shop create component, service and module
		ng g c shop --flat --skip-tests
		ng g s shop --skip-tests --flat
		ng g m shop-routing --flat
	Move navbar inside our core module
		In app.component.ts remove NavBarComponent, insert CoreModule
		In core.module.ts import NavBarComponent, export NavBarComponent
	Models into shared folder
Angular services
	Services are decorated with the @Injectable
	Services are Singletons, they are initialized as our application starts.
		They are always available as our app is available unlike components that are initialized and destroyed
	Modify shop.service.ts
		```
		import { Injectable } from '@angular/core';
		import { HttpClient } from '@angular/common/http';
		import { IPagination } from '../shared/models/pagination';
		@Injectable({
		  providedIn: 'root'
		})
		export class ShopService {
		  baseUrl = 'https://localhost:5079/api/';
		  constructor(private http: HttpClient) { }
		  getProducts(){
		    return this.http.get<IPagination>(this.baseUrl + 'products');
		  }
		}
		```
Consume our getProducts method inside ShopService in our component
==Notes(1)==
	Tutorial will not focus on responsivness.
Quick UI layout
	![[Pasted image 20250416171337.png]]

---

***Angular commands:***
	*ng g m core*
	*ng g m shop*
	*ng g m shared*
	*ng g c shop --flat --skip-tests*
	*ng g s shop --skip-tests --flat*
	*ng g m shop-routing --flat*

---

Notes(1)

---
*Start Date: 16.04.2025*
*End Date: 16.04.2025*
*Time Spent: 2h*
*Tutorial Video length: 37min*

---
*Tutorial link:*
*[Building the UI for our shop in Asp.Net Core part 12](https://www.youtube.com/watch?v=BoAi3Vdn8ik&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=13)*