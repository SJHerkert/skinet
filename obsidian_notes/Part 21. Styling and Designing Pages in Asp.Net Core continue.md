Overview: Product card button layout.

---

UI, Layout

---

Buttons
	Moved to middle and on top of the product image in the shop and the product cards.
Bootswatch
	*npm install bootswatch*
	Modify angular.json
		The bootswatch theme can be changed in the angular.json
Artificial delay
	In error.interceptor.ts using the pipe, add delay, and update import from rxjs
Loading indicator
	Install ngx-spinner
		*npm i ngx-spinner*
			*[ngx-spinner - npm](https://www.npmjs.com/package/ngx-spinner)*
	Create a folder called services inside core folder
		Create a service called busy.service.ts
			*ng g s busy --flat --skip-tests*
	Add a new loading interceptor
		In interceptors folder add loading.interceptors.ts
			Remember to make it @Injectable
	Remove the delay from error interceptor.	
Cleaning up stale data showing up during "loading"
	Wrap items that should be hidden during loading by wrapping them inside a ng-container.
	Hide search box:
		in search box's starting div tag use *ngIf="products"*
		Change static to false, otherwise the search box doesn't work.
	Product Details Component (Shows product id number during loading)
		==Error(1)==
			==Assumption:==
			Due to the modification of the code in the loadProduct() method inside product-details.component.ts due to errors.
			Original tutorial version:
				```
				loadProduct() {
				this.shopService.getProduct (+this.activateRoute.snapshot.paramMap.get('id')). subscribe(product => {
				this.product = product;
				this.bcService.set('@productDetails', product.name);
				}, error => {
				console.log(error);
				});
				}
				```
			My version:
				```
				loadProduct() {
				const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
				if (id && id > 0){
				this.shopService.getProduct(id).subscribe(
				product => {
				this.product = product;
				this.bcService.set('@productDetails', product.name);
				}, error => {
				console.log(error);
				})
				}
				}
				```
			Now, the issue here is, that if i have navigated to the product detail page (template/component) then i have loaded the product, if I hit refresh i will show the product id in the product title during the loading. As such my code doesn't behave as expected, but then again it does. 
			==Solution:==
			Further investigation and testing three different loadProduct() methods the problem was in the constructor part, In the tutorial we use the bradcrumb service and insert an empty string, which is replaced later by the loadProduct() method.
			However, unbeknownst to me in order for there be an empty string an ampy space is also a must in the code, as follows:
			Instead of:
			```
			constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private bcService: BreadcrumbService){
			this.bcService.set('@productDetails', '')
			}
			```
			Use a blank space between the single quotes as such:
			```
			constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private bcService: BreadcrumbService){
			this.bcService.set('@productDetails', ' ')
			}
			```
			This will force the returned breadcrumb to be empty, instead of it getting the id or the name.
			Also the issue was that if i went to the shop and clicked on another item/product card to view the details, it would, for a brief moment show me the previous items name in the section header part of the page. As we now pass empty, until loading is allowed to continue after the delay has passed, we then load the information that replaces the empty string in the breadcrumb with the actual strings.
		Error solved.
Carousel
	Using the NgBootstrap, in there we find it has carousel for images
		*[Angular powered Bootstrap](https://ng-bootstrap.github.io/#/components/carousel/examples)*
	Creating a new folder for carousel component, core/carousel
		2 new files, template and ts file.
		taking example from the examples in ng-bootstrap
	HomeModule imports NgbdCarouselNavigation
		This is exported from the carousel.component.ts
Home view and the Carousel
	==Error(2)==
		The carousel is clipping the navbar
		==Assumptions:==
		Something to do with the way the component are imported?
		Carousel component problem?
		Home component problem?
			Tested using the carousel inside homecomponent instead of importing: same result.
		==Solution:==
		Added the carousel inside a section, and gave it some style guides
			```
			<section class="carousel d-flex justify-content-center mt-5">
			<app-carousel></app-carousel>
			</section>
			```
		Error solved.
	==Error(3)==
		The carousel image is not span across the max width of the viewport.
		==Assumptions:==
		ToastrService interferes with the containers?
		Style Encapsulation issue?
		Overflow issues?
		==Solution:==		
		The issue was with parent container, declaring a css(scss but using css tyled code) class name to it and then in styling:
			overflow: visible.
		Also in img, styling:
			width: 100vw;
		Error solved.
Some UI layout adjustments using margins.
	Layout positioning for different shop sections
	Select tag styling

---

***Node commands***
	*npm install bootswatch*
	npm i ngx-spinner
***Angular commands***
	*ng g s busy --flat --skip-tests*

---

Errors(1,2,3)

---
*Start Date: 29.04.2025*
*End Date: 04.05.2025*
*Time Spent: 5,5h*

*Tutorial Video length: 41min*

*About time management:* 
"Time spent on solving the usage of stand-alone vs ngmodule components, and differences between tutorial and present versions, both in packages and angular. Reading docs."

---
*Tutorial link:*
*[Styling and Designing Pages in Asp.Net Core continue Part 21](https://www.youtube.com/watch?v=iZXj4KhIfKk&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=22)*

*Related links:*
*[Bootswatch: Free themes for Bootstrap](https://bootswatch.com/)*
*[ngx-spinner - npm](https://www.npmjs.com/package/ngx-spinner)*
*[Angular powered Bootstrap](https://ng-bootstrap.github.io/#/components/carousel/examples)*

*Interesting links:*
*[Styling • Angular](https://angular.dev/guide/components/styling)* - *Check ViewEncapsulation(Style scope)*