Overview: Creating components, understanding how they work. How we can use components in our angular application. Getting data from API using http client. Understanding the basics of observables and Typescript.

---

Adding components
Http client module

---


Adding components
	Navbar
		ng g c nav-bar --skip-tests
			As the tutorial doesn't cover tests we will skip generating tests.
		Modifying the navbar
		==Tutorial Issue(1)==
			Font-awesome didn't work initially, the following packages resolved the issue:
				npm install @fortawesome/free-solid-svg-icons
				npm install @fortawesome/angular-fontawesome
		Adding assets folder and copying tutorial assets inside
		Adding the images
			I need to add the folowing to angular.json to include the assets folder
				```
				}
				"glob": "**/*",
				"input": "public"
				 },
				"src/assets"  <----- Add this
				```
Http client module
	==Tutorial Issue(2)==
		Angular 19 doesnt have ap.module.ts anymore as it's shifted to stand alone modules/components.
	HttpClient in app.component.ts 
		As we use stand alone,we can import the HttpClient using the "providers:[]" in our decorator.
			```
			import { Component, OnInit } from '@angular/core';
			import { RouterOutlet } from '@angular/router';
			import { NavBarComponent } from "./nav-bar/nav-bar.component";
			import { HttpClient } from '@angular/common/http';
			//Decorator
			@Component({
			  selector: 'app-root',
			  imports: [RouterOutlet, NavBarComponent],
			  providers: [HttpClient],
			  templateUrl: './app.component.html',
			  styleUrl: './app.component.scss'
			})
			export class AppComponent implements OnInit {
			  title = 'SkiNet'; 
			  //Inject http client
			  constructor(private http: HttpClient){}
			  ngOnInit(): void {
			    throw new Error('Method not implemented.');
			  }
			}
			``` 
	Lifecycles, implements OnInit
	In app.component.ts
		--> constructor
		--> and interface implementation
Extra
	Bootstrap themes, options, and their licences.
	Sass or scss.
		To use a 
==Tutorial Issue(3)==
	Unfortunately some parts may be missing as the tutorial freezes at 33min. As such we are missing the result to get data fro our API, nevertheless I think as the code is changed going further it is a non issue.

---

***node commands:***
	npm install @fortawesome/free-solid-svg-icons
	npm install @fortawesome/angular-fontawesome
***angular commands:***
	ng g c --help
	ng g c nav-bar --skip-tests


---

Tutorial Issues(1,2,3)
Notes(0)

---
*Start Date: 15.04.2025
*End Date: 15.04.2025*
*Time Spent: 3h*
	*Setup: *
	*Notes *
	*Video*
*Tutorial Video length: 37min

*About time management:* 
"Info on time management in this part"

---
*Tutorial link:*
*[Angular Basic in Asp.Net Core Part 10](https://www.youtube.com/watch?v=3IqrkLoftQk&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=11)*

*Related links:*
*Any related links*

*Interesting links:*
*[Licenses - Bootstrap Themes](https://themes.getbootstrap.com/licenses/)*
*[Sass Tutorial](https://www.w3schools.com/sass/default.php)*
*[Flexbox Froggy - A game for learning CSS flexbox](https://flexboxfroggy.com/)*