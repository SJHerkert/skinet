Overview: Implementing a generic repository.

---

Generic Repository
Specification pattern
Using the specification pattern
*part2*
Using the debugger
Shaping data
AutoMapper
Serving static content from the API

---


Generic Repository
	Created in Core/Interfaces - IgenericRepository(interface)
	Created in Infrastructure/Data - GenericRepository(class)
	Modified ProductsController to initialize our GenericRepository
	Modified controllers actions to use these
		Our generic repository doesnt have access to include, next we are working around this.
Specification pattern
	Generic repository is an anti pattern
		Meaning it has to open the whole dataset for query, and it has no way to query a specific part of data. The code can be very non telling also, it doesn't tell much. 
	Specification to pass to the generic repository, to query a specific list (specification passed as parameter in the List)
	IQueryable, Where, Include,ToListAsync
		Pass IQueryable to List, List gets the information of what we want it to fetch for us from the database. 
		We can have multiple where clauses, and we can have our includes
		ToListAsync - calls db - uses iqueryable, runs the operations inside the iqueryable against the db async.
	Lets create our interface
		Core new folder  Specifications
			inside new interface ISpecification
			inside new class BaseSpecification
	Specification evaluating class
		Infrastructure/Data -> new SpecificationEvaluator class
		Core/Specifications -> new ProductsWithTypesAndBrandsSpecification

*end of tutorial part1*
*tutorial 1,02h, used time 2,5h*

---

***dotnet commands(0):***
***Visual Studio Code commands(0)***	

---

Tutorial Issues(0)
Notes(0)

---
*Start Date: 01.04.2025
*End Date: 01.04.2025*
*Time Spent: 2,5h*
	*Setup: *
	*Notes *
	*Video*
*Tutorial Video length: 1.02h*

*About time management:* 

---
*Tutorial link:*
*[Generic Repository using API in .net core part 4](https://www.youtube.com/watch?v=xy7rWCd6YqU&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=5)*

*Related links:*
*Interesting links:*