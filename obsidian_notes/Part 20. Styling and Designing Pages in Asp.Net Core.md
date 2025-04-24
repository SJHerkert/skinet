Overview: Styling, and improvements in UI. Breadcrumbs and page headers, loading indicator.

---

Improving the UI:
Adding a page header
Adding breadcrumbs
-
(in the next part)
Styling the product items
Adding loading indicators
Changing the bootstrap theme
Improving the home page

---

Section header
	in src/app/core add
		ng c section-header --skip-tests
		Styling of the template
BreadCrumbs
	Add a new package called xng-breadcrumb
		*[xng-breadcrumb - npm](https://www.npmjs.com/package/xng-breadcrumb)* 
		Before installing, check compatibility with Angular version -check
			latest has compatibility with angular 19
		*npm i xng-breadcrumb*
			Installed version is latest:
			"xng-breadcrumb": "^13.0.0",
				==Tutorial Issue(1)==
					Seeing from video the tutorial is at least 5 years old, and therefore the version changes or differences are to be expected. It uses xng-breadcrumb vs. 5.0.1 comp. with ang 8, latest is vs. 13.0.0 comp. with ang 19. In a sense this is a lucky occurence, as the xng-breadcrumb ang 19 comp. vs. was released just 2 months ago, as of today 22.04.2025.
		Xng-Breadcrumb documentation:
			*[Quick start](https://udayvunnam.github.io/xng-breadcrumb/#/quickstart)*
			==Tutorial Issue(2)==
				Check Xng-Breadcrumb documentation for usage, as tutorial shows  information regarding not stand alone usage. The difference is, in stand alone we import BreadcrumbComponent and BreadcrumbItemDirective directly to the component., VS. BreadcrumbModule from xng-breadcrumb inside our coremodule.
					Thinking around the subject with CoPilot, check out [[Chat01. about Stand-Alone vs Modules(NgModule)]] in the notes.
	Adding the product title to the breadcrumb
		in shop-routing.module.ts
			```
			{path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}},
			```
		in product-details.component.ts add
			In the constructor import a private BreadcrumbService, and in the loadProduct method add
				```
				this.bcService.set('@productDetails', product.name);
				```
		Now as we navigate to a product details page also the name of the product will be displayed in the breadcrumb
	Adding some styling in styles.scss
	Adding the name of the title as the opened Breadcrumb.
		Topics discussed:
			Observables
			Subscribing
			Pipes
				[RxJS - Conversion to Promises](https://rxjs.dev/deprecations/to-promise)
			The Topic here is the fact that when we subscribe to something, we like the subscribtion to be finite, with our breadcrumbs it might not be so. By using our observable together with the async pipe in our template, will ensure that the observable is subscribed to and unscubscribed as the component is stopped. And this should be done automatically by the async pipe.
		The approach here is to make a new property called breadcrumb, according to tutorial the naming convention has been to add a $ after a property name to tell that it is an observable. This convention is also mentioned at the angular v.17 docs.
		[Angular - Observables in Angular](https://v17.angular.io/guide/observables-in-angular)  !V17
		[Pipes • Angular](https://angular.dev/guide/templates/pipes) !V19
		Async pipe
			Check above for description of why it is used.
		We add logic in the section-header template, 
			Wrap the whole thing inside ng-container, add the async pipe here.
			In the section add logic:
				Show the breadcrumbs section - if(returned breadcrumbs length is higher than 0 && from the returned breadcrumbs array of strings (-1 from length) label is not equal to string 'Home')
			
---

***Angular commands***
	*ng c section-header --skip-tests*
***Node commands:***
	*npm i xng-breadcrumb*

---

Tutorial Issues(1,2)

---
*Start Date: 22.04.2025*
*End Date: 24.04.2025*
*Time Spent: 5,5h*
*Tutorial Video length: 0,5h*

*About time management:* 
*"Going through documentations alongside the tutorial as new topics are mentioned, doing a comparison between versions, some off-topic research."*

---
*Tutorial link:*
*[Styling and Designing Pages in Asp.Net Core Part 20](https://www.youtube.com/watch?v=gbJG9Rrp4dw&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=21)*

*Related links:*
*[Quick start](https://udayvunnam.github.io/xng-breadcrumb/#/quickstart)*
*[RxJS - Conversion to Promises](https://rxjs.dev/deprecations/to-promise)*

*Interesting links:*
*[TypeScript Operators | GeeksforGeeks](https://www.geeksforgeeks.org/typescript-operators/)*