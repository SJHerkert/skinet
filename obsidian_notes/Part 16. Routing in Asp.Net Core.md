Overview: Routing.

---

Routing

---

18.00->
Routing
	New feature model, Home model
		In folder app:
		*ng g m home*
		In folder home:
		 *ng g c home --skip-tests --flat*
		In folder shop:
		*ng g c product-details --skip-tests*
	Add routes in app.routes.ts
		```
		export const routes: Routes = [
		{path: '', component: HomeComponent},
		{path: 'shop', component: ShopComponent},
		{path: 'shop/:id', component: ProductDetailsComponent},
		{path: '**', redirectTo: '', pathMatch: 'full'}
		];
		```
	Add links:
		Setting up our navigation links
		Replace ahref from nav-bar template and use routerlink
			```
			[routerLink]="['/']" routerLinkActive="router-link-active" >Home</a>
			```
		Add RouterModule to nav-bar.component.ts Import
		==Tutorial Issue(1)==
			As per tutorial adding the RouterModule to the "parent" fex. shopmodule, doesnt allo product-item to use this, there is propably something going on. I still can import the RouterModule directly to the component I want to use it in. 
			For now I decided to export from shopmodule the routermodule.
				As shop.module.ts now stands it exports ShopComponent and RouterModule, wrapped in a class called ShopModule.
			So in this way when I import in product-item component this, i can just import the ShopModule, and it will then include the RouterModule.
			==Error==
				Nope, didn't work at all, as I'm using stand alone components i will directly include its dependencies within its imports array.
		==Tutorial Issue(2)==
			As In my version I'm using stand alone components there is no need for a parent module - child component hierachy. All components manage their own depencies. I'lll still leave the structure in place to follow the tutorial succesfully. But as a reminder, declare the depencies in the components own input array.
->18.55

---

***Angular commands(0):***
	 *ng g m home*
	 *ng g c home --skip-tests --flat*
	 *ng g c product-details --skip-tests*

---

Tutorial Issues(1)
Error(1)

---
*Start Date: 18.04.2025
*End Date: 18.04.2025*
*Time Spent: 1h**
*Tutorial Video length: 13min*

*About time management:* 
"The stand alone thing keeps popping up, this took some time as was trying to get the parent modules to work, but solved."

---
*Tutorial link:*
*[Routing in Asp.Net Core part 16](https://www.youtube.com/watch?v=bxaQNNR7ypk&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=17)*