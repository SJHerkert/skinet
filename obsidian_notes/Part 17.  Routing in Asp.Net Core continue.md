Overview: Routing/Navigation.

---

Routing
Navigation

---

UI elements
	Changing the style of navbar links, didn't get the links to show orange after click.  Some css, styling in scss file.
Navigation
	Adding product detail page data.
	When we click on the item/product name etc,
		->Filter a header request using the clicked items id
			-> reroute to product details page
				->show by id the details of the item
					-> data by id
	==Error(1)==
		Instead of the item id=X im passing consistently id=0.
	==Tutorial Issue(1)==
		MAJOR MAJOR issue, in tutorial we were using :
			```
			<button [routerLink]="['/shop/{{product.id}}]"
			```
			but it gave odd strings in the header. This caused all kinds of issues.
			The way today, in Angular 19 is to use:
			```
			<button [routerLink]="['/shop', product.id]"
			```
			This caused the zero issue, and URL encoding
			Example:
				```
				https://localhost:4200/shop/%7B%7Bproduct.id%7D%7D
				```
	==Tutorial Issue(2)==
		In tutorial the loadProduct doesnät take into account possible null, maybe due to version change, I get the error and this prevents the app to getting a proper result from API, i can "pass" the right id, and it's show, but when the page is load, a cached? id number is haunting the header and we get no product, below is the corrected version with a null check(inside product-details.component.ts):
			```
			  loadProduct() {
			    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
			    if (id && id > 0){
			      this.shopService.getProduct(id).subscribe(
			        product => {
			          this.product = product;
			      }, error => {
			        console.log(error);
			      })
			    }
			  }
			```

Adding Product Context
	Modifying product-details.component.html
Lazy loading
	Instead of loading all the modules and components at app opening we can define parts to be loaded

---

Tutorial Issue(1,2)
Errors(1)

---
*Start Date: 18.04.2025*
*End Date: 18.04.2025*
*Time Spent: 5h*
*Tutorial Video length: 29min*

*About time management:* 
"A lot of time spent on debugging"

---
*Tutorial link:*
*[Routing in Asp.Net Core continue part 17](https://www.youtube.com/watch?v=dIPsUvbs684&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=18)*
