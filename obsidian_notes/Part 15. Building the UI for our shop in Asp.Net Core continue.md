Overview: Pagination - turn into a a shared component.

---

Pagination
Search

---

Pagination
	Make new component in components folder called pager
		ng g c pager --skip-tests
	==Note(1)==
		The pagination seems to give error as its a bootstrap thing, specifically a ngx-bootstrap thing. So I¨ll try to search if the ng-bootstrap I used has a pagination as well.
		And its found, using NgbModule from ng-bootstrap
			```
			import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
			@Component({
			  selector: 'app-pager',
			  imports: [NgbPaginationModule],
			  templateUrl: './pager.component.html',
			  styleUrl: './pager.component.scss'
			})	
			```
	==Note(2)==
		Due to version not supprted I initially opted for the ng-bootstrap, as the tutorial went forward it was missing the pagination part, and later I found out that the html tag that was used was called pagination when I must use ngb-pagination tag. Check ng-bootstrap page for more info.
	In our pager.component.html ->		
			```
			<ngb-pagination
			[boundaryLinks]="true"
			[collectionSize]="this.totalCount"
			(pageChanged)="onPagerChange($event)"
			[pageSize]="this.pageSize"
			previousText="&lsaquo;"
			nextText="&rsaquo;"
			firstText="&laquo;"
			lastText="&raquo;">
			</ngb-pagination>
			```
	In our pager.component.ts ->
		```
		import { Component, EventEmitter, Input, Output } from '@angular/core';
		import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
		@Component({
		  selector: 'app-pager',
		  imports: [NgbPaginationModule],		  
		  templateUrl: './pager.component.html',
		  styleUrl: './pager.component.scss'
		})
		export class PagerComponent {
		  @Input() totalCount!: number;
		  @Input() pageSize!: number;
		  @Output() pageChanged = new EventEmitter<number>();		  
		  onPagerChange(event: any) {
		  this.pageChanged.emit(event.page);
		  }
		}
		```
Step by Step guide by CoPilot(It was easier as I'm still learning to let CoPilot divide this into steps, so that it is of use also to me)
	**Step 1: Define Input and Output Properties in Child Component**
		
		1. Create a new `PagerComponent`.
		    
		2. Add the required input properties (`totalCount` and `pageSize`) for receiving values from the parent component.
		    
		    typescript
		    
		    ```
		    @Input() totalCount: number;
		    @Input() pageSize: number;
		    ```
		    
		3. Add an output property `pageChanged` to emit events back to the parent.
		    
		    typescript
		    
		    ```
		    @Output() pageChanged = new EventEmitter<number>();
		    ```
		    
		
		### **Step 2: Create the Method in Child Component**
		
		4. Define a method in the child (`PagerComponent`) that will handle page change events:
		    
		    typescript
		    
		    ```
		    onPageChanged(event: any): void {
		      this.pageChanged.emit(event.page);
		    }
		    ```
		    
		
		### **Step 3: Bind Properties and Events in Template**
		
		5. Update the child component’s template (`pager.component.html`) to handle input properties and emit output events. Example with Angular's pagination system:
		    
		    html
		    
		    ```
		    <ngb-pagination
		      [collectionSize]="totalCount"
		      [(page)]="currentPage"
		      [pageSize]="pageSize"
		      (pageChange)="onPageChanged($event)">
		    </ngb-pagination>
		    ```
		    
		
		### **Step 4: Use the Child Component in Parent Component**
		
		6. Place the `PagerComponent` in the parent’s template (`shop.component.html`) and bind the input and output:
		    
		    html
		    
		    ```
		    <app-pager
		      [totalCount]="totalCount"
		      [pageSize]="shopParams.pageSize"
		      (pageChanged)="onPageChanged($event)">
		    </app-pager>
		    ```
		    
		7. Pass `totalCount` and `pageSize` as inputs.
		    
		8. Bind the `pageChanged` output to the parent’s method `onPageChanged`.
		    
		
		### **Step 5: Implement Parent Method for Handling Events**
		
		9. Add the `onPageChanged` method to the parent component (`ShopComponent`) to respond to the emitted event:
		    
		    typescript
		    
		    ```
		    onPageChanged(event: number): void {
		      this.shopParams.pageNumber = event;
		      this.getProducts(); // Fetch updated data based on the new page
		    }
		    ```
	
		    
		
		### **Step 6: Test the Workflow**
		
		10. Verify that:
		    
		    - The parent provides input properties (`totalCount` and `pageSize`) to the child.
		        
		    - The child emits the page change event, which is handled by the parent.
		        
		    - Pagination updates dynamically as expected.
		        
		
		This breakdown should make it easier for you to review and implement the steps without constantly switching back and forth between the video and your code. Let me know if you'd like further clarifications! 😊
==Error==
	In my browser i was getting undefined indexpage or pagenumber, pagination was working fine, but i was still getting an api error. The solution was to pass the pagenumber to the child component, first to declare it in parent component and then pass it to the child.
Below is the full step to get the pagination working:
	pager.component.ts:
		```
		import { Component, EventEmitter, Input, Output } from '@angular/core';		
		import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';		
		@Component({
		  selector: 'app-pager',
		  imports: [NgbPaginationModule],
		  templateUrl: './pager.component.html',
		  styleUrl: './pager.component.scss'
		})
		export class PagerComponent {
		  @Input() totalCount!: number;
		  @Input() pageSize!: number;
		  @Input() pageNumber! : number
		  @Output() pageChanged = new EventEmitter<number>();
		  onPagerChange(event: any): void {
		    this.pageChanged.emit(event);
		  }
		}
		```
	pager.component.html
			```
		<ngb-pagination
		[boundaryLinks]="true"
		[collectionSize]="totalCount"
		(pageChange)="onPagerChange($event)"
		[pageSize]="pageSize"
		[(page)]="pageNumber">
		</ngb-pagination>
			```
	shop.component.ts
		```
		  onPageChanged(event: number):void {
		  this.shopParams.pageNumber = event;
		  this.getProducts();
		  }
		```
	shop.component.html
		```
		<app-pager
		[pageSize]="shopParams.pageSize"
		[totalCount]="totalCount"
		[pageNumber]="shopParams.pageNumber"
		(pageChanged)="onPageChanged($event)">
		</app-pager>
		```
*tutorial 10min, used time 2,5h* 
20.00->
Search
	Template Reference Variable(TRV) for the Input in shop.component template
		```
		<input class="form-control mr-2" #search style="width: 300px" placeholder="Search" type="text">
		```
	In shop.component.ts
		Add ViewChild()
			We can then access our TRV that is a child of our shop component
	As stated in tutorial part 11. obsidian notes, in order to defer an error in an api call, that demanded the presence of search in the header, we now must allow these back in. So lets uncomment the code pieces as in per part11. we commented out.
		==Error(2)==
			After uncommenting, the search input works, but there's an issue when loading the page, as it tries to get all products it has no search in header, this is required, so this must be tackled next.
			Okay so there was an extra Search value in ProductSpecParams, removing these solved the issue.
			The idea behind was that it somehow was related to search. I came down to that something had to inject something, as it made no sense when all parts were okay, that this just wouldnt work.
			Where did this extra value come from.
			Previously when doing comparison with example project and mine, and trying to get the pagination/search to work, i propably copied a part that wasn't supposed to be there. So I think that it was my fault.
			Upon testing the application it was obvious that removing these had broken the search function all together. Inspecting further:
				```
					public string? Search
				    {
				        get => _search!;
				        set => _search = value.ToLower();
				    }
				```
				The real issue is/was in the value.ToLower part. It needs to be:
				```
					public string? Search
					{
						get => _search!;
						set => _search = value?.ToLower();
					}
				```
			Error solved.
			==Note(3)==
				Be extra careful with tutorials that show in their example a no error situation with values, as I think that Angular version 19 is very strict, or it's because of Typescript. 
*tutorial 24min, used time 2,5h* 

---

***Angular  commands:***
	*ng g c pager --skip-tests*

---

Tutorial Issues()
Errors(1)
Notes(1,2,3)

---
*Start Date: 17.04.2025
*End Date: 17.04.2025*
*Time Spent: 5h
*Tutorial Video length: 26min*

*About time management:* 
"A lot of bugs to fix, a lot of challenges, a lot of debuggin, ready for next section!"

---
*Tutorial link:*
*[Building the UI for our shop in Asp.Net Core continue part 15](https://www.youtube.com/watch?v=9FnpnOhJdXs&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=16)*

*Related links:*
*[Angular powered Bootstrap](https://ng-bootstrap.github.io/#/components/pagination/overview)*