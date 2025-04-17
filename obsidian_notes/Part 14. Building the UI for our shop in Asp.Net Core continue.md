Overview: Sorting, when selecting options we sort the products in selected order.

---

Sorting
Pagination

---

Sorting
	==Tutorial Issue(1)==/==Error(1)==
		When using event target in shop.component.html
			```
			   <select class="custom-select mb-3" change)="onSortSelected($event.target.value)">
			```
			The .value part causes an error:
				Object is possibly 'null'.ngtsc(2531)
			Work around this was found in Stack Overflow, by disabling type checking:
				```
				...setNewUserName($any($event.target).value)"/>
				```
			Error solved			
Adressing the problem of passing too many parameters to our getProducts() method
	Create a class that is going to store our parameters that are passed to our getProducts() method inside our shop.component.ts
		In shared folder new class called shopParams.ts
			Refactor, Rename
Pagination
	==Tutorial Issue(2)==
		The part where we have created pagination is missing, I have to compare the example project files.
			There is a pagination.ts file - found
			There is a pager component - not found
			There is differences in shop.service.ts - modified

==Note(1)==
	Pagination is still an issue and has to be revisited at a later date.
==Error(2)==
	The filtering for our types wasn't working
		No type id for filtering
		Error was a typo, instead of the upper one, the lower one solves the typo.
		```
					if (shopParams.typeId ! ==0) {		
			  params = params.append('typeId', shopParams.typeId.toString());		
			}
		```
		```
				    if (shopParams.typeId !== 0) {		
		      params = params.append('typeId', shopParams.typeId.toString());		
		    }
		```
	Error solved
Making the header that shows item number results as an component
	new folder in shared called components
		inside new component called
			ng g c paging-header --skip-tests

---

***Angular  commands:***
	*ng g c paging-header --skip-tests*

---

Tutorial Issues(1,2)
Errors(1,2)
Notes(1)

---
*Start Date: 16.04.2025
*End Date: 17.04.2025*
*Time Spent: 3h*
*Tutorial Video length: 35min*

*About time management:* 
"Most of time was spent trying to figure out the pagination, no solution yet found"

---
*Tutorial link:*
*[Building the UI for our shop in Asp.Net Core continue part 14](https://www.youtube.com/watch?v=OqTqSdT0irA&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=15)*

*Related links:*
[html - Angular error TS2531: Object is possibly 'null' - Stack Overflow](https://stackoverflow.com/questions/67123603/angular-error-ts2531-object-is-possibly-null)
