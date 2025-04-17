Overview: Continuing module 9. UI for the client. File and folder structure, refactoring. Angular services. Filtering, pagination sorting and searching. Input and Output properties among components.

---

UI
Filtering

---

Creating child component that holds our individual product items(cards).
	Inside shop folder
		ng g c product-item --skip-tests
Filtering
*tutorial 10min, used time 0,5h* 
==Tutorial Issue(1)==
	As per tutorial some sections were left out by the author.
		Images wouldn't load(return) from the API side
			Create an asset folder inside API
				skinet/API/Content/images/products
					Copy used product images here
			==Error(1)==
				The images load only when i push save on the angular html file. If I refresh page, the images vanish. The following error is present:
					core.mjs:6514 ERROR Error: Method not implemented.
				    at  ProductItemComponent.ngOnInit (product-item.component.ts:16:11)
				The culprit was the ngOnInit metod, it had the default code inside it, this caused the error:
					```
					ngOnInit(): void {					
					throw new Error('Method not implemented.');					
					}
					```
				Error solved
In html part I must use {{product?.price}} question mark or there's an error in IDE, but works fine in the browser:
 Chat with CoPilot regarding filtering in angular html:
	Why do i need the question mark in here?
	```
	<div class="card h-100 shadow-sm">
		<img src="{{product?.pictureUrl}}" alt="{{product?.name}}">
		<div class="card-body d-flex fex-column">
			<a href="#">
				<h6 class="text-uppercase">{{product?.name}}</h6>
			</a>
			<span class="mb-2">{{product?.price}} </span>
			<div class="btn-group mt-auto">
				<button type="button" class="btn btn-outline-secondary fa fa-shopping-cart mr-2">                
				</button>
				<button type="button" class="btn btn-outline-secondary">View</button>
			</div>
		</div>
	</div>
	```
	
	Great question, Simon! The question mark (`?.`) you see is known as the **safe navigation operator** (or **optional chaining**) in Angular templates. It's used to prevent runtime errors when attempting to access properties of an object that might be `null` or `undefined`.
	
	##### Why you need it here:
	
	In your example, properties like `product.pictureUrl`, `product.name`, and `product.price` are being accessed. However, there might be instances when the `product` object hasn't been initialized yet (e.g., during component rendering). Without the `?.`, Angular would throw an error because it can't read the property of `undefined` or `null`.
	
	For example:
	
	- If `product` is `undefined` or `null`, trying to access `product.pictureUrl` directly would cause an error.
	    
	- By using `product?.pictureUrl`, Angular checks first if `product` exists. If it doesn’t, it gracefully returns `null` without crashing the application.
	    
	
	##### How it works:
	
	- If `product` is truthy (i.e., not `null` or `undefined`), Angular proceeds to access its properties like `pictureUrl`, `name`, and `price`.
	    
	- If `product` is falsy, the safe navigation operator ensures the app doesn't attempt to access deeper properties, avoiding an error.
	    
	
	##### When not to use it:
	
	If you're **certain** that `product` will always have a value (e.g., it is initialized beforehand), you don't need the `?.`. However, in most dynamic or asynchronous scenarios (like fetching data from an API), it's safer to include it.
	
	Hope that clears up the mystery! Let me know if you'd like further clarifications. 😊
	
	this still works without the ?
	
	You're right, Simon—your code can still work without the safe navigation operator (`?`). However, the reason it's recommended in certain scenarios is to prevent potential runtime errors in cases where the object or property being accessed might be `undefined` or `null`.
	
	##### Why it works without `?`
	
	If you are confident that the `product` object is always initialized and contains valid properties (e.g., `pictureUrl`, `name`, etc.) before Angular tries to render the template, you don’t need to use the safe navigation operator. Angular will happily bind and display the values without issue.
	##### Why it's safer to use `?`
	
	In dynamic applications, especially when data is fetched asynchronously (e.g., from an API), there could be a short period where `product` is undefined or null while waiting for the data to load. During this time:
	
	- Without `?`, Angular will attempt to access the properties (e.g., `pictureUrl`), causing an error like `Cannot read property 'pictureUrl' of undefined`.
	    
	- With `?`, Angular gracefully handles the situation by returning `undefined` for the whole expression until the object is available.
	    
	
	##### Best Practices
	
	If you're certain that `product` is always defined, feel free to skip `?.`. But if there's even a slight chance that the object or its properties might not exist yet, using `?.` is a good precaution to avoid runtime errors and improve robustness.
Card view done.
*tutorial 12min, used time 1h* 

Modifying the left hand side of the UI (two lists)
	Added Brands and Types list to the left side
		Fetches names for the types and brands
	Adding the functionality to these, particularily the API calls (filtering)
	We now have a way to filter the product card results by brand and by type.
		![[Pasted image 20250416193546.png]]
*tutorial 38min, used time 1h* 

---

***Angular commands:***
	*ng g c product-item --skip-tests*

---

Tutorial Issues(1)
Errors(1)

---
*Start Date: 16.04.2025*
*End Date: 16.04.2025*
*Time Spent: 2,5h*
*Tutorial Video length: 38min*

---
*Tutorial link:*
*[Building the UI for our shop in Asp.Net Core continue part 13](https://www.youtube.com/watch?v=A0ksa-z-gMo&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=14)*
