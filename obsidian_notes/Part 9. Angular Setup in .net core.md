Overview: To have a working Angular application running on HTTPS. To understand what a component and module is in Angular and what they are used for.
==Note (1)==
	Tutorial is made in Angular version 8, and version 9.

---

Installing the Angular CLI
Creating the Angular project
Setting up VS Code for Angular
Setting up Angular to use HTTPS
Adding Bootstrap / Font-Awesome

---

Installing the Angular CLI
	Node.js & Angular CLI
		Angular runs on top of Node.
		Node is used to run Angular, node also comes with package manager.
		Use NVM(Node Version Manager)
			nvm ls
				 23.9.0
				-22.14.0 (Currently using 64-bit executable)
		==Note(2)==
			Tutorial has node version 13.7.0 - so a big difference
		==Note(3)==
			As I have previously used NVM and installed node and Angular CLI, everything should work fine and be ready to developement.
		Once we have node we have access to npm
		Install latest Angular CLI
			npm install -g @angular/cli
				added 2 packages, removed 1 package, and changed 272 packages in 27s
			ng version
				Angular CLI: 19.2.7
				Node: 22.14.0
				Package Manager: npm 10.9.2
				OS: win32 x64
				Angular:
				...			
				Package                      Version
				------------------------------------------------------
				@angular-devkit/architect    0.1902.7 (cli-only)
				@angular-devkit/core         19.2.7 (cli-only)
				@angular-devkit/schematics   19.2.7 (cli-only)
				@schematics/angular          19.2.7 (cli-only)
Creating the Angular project
	In our skinet folder
		ng new client
			ng = angular command
			new = new project
			client = name of the project inside the folder we're in
		Choose SCSS
		No SSR
		Results:
			√ Which stylesheet format would you like to use? Sass (SCSS) [ https://sass-lang.com/documentation/syntax#scss]
			√ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
			CREATE client/angular.json (2866 bytes)
			CREATE client/package.json (1036 bytes)
			CREATE client/README.md (1528 bytes)
			CREATE client/tsconfig.json (942 bytes)
			CREATE client/.editorconfig (331 bytes)
			CREATE client/.gitignore (629 bytes)
			CREATE client/tsconfig.app.json (439 bytes)
			CREATE client/tsconfig.spec.json (449 bytes)
			CREATE client/.vscode/extensions.json (134 bytes)
			CREATE client/.vscode/launch.json (490 bytes)
			CREATE client/.vscode/tasks.json (980 bytes)
			CREATE client/src/main.ts (256 bytes)
			CREATE client/src/index.html (305 bytes)
			CREATE client/src/styles.scss (81 bytes)
			CREATE client/src/app/app.component.html (20239 bytes)
			CREATE client/src/app/app.component.spec.ts (945 bytes)
			CREATE client/src/app/app.component.ts (295 bytes)
			CREATE client/src/app/app.component.scss (0 bytes)
			CREATE client/src/app/app.config.ts (318 bytes)
			CREATE client/src/app/app.routes.ts (80 bytes)
			CREATE client/public/favicon.ico (15086 bytes)
			√ Packages installed successfully.
			Directory is already under version control. Skipping initialization of git.
		==Note(4)==
			The just created client project doesn't seem to show up in VS Code Solution explorer, but does show up in above normal explorer, maybe a cache thing or a refresh thing?
		Making sure it works
			ng serve from skinet/client folder
				Expected error as script cannot be run if there is execution policy in place:
					Solution(Run from terminal in the folder you want to set the execution policy in):
						 Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned 
				Interesting aspect in difference between versions:
					![[Pasted image 20250410215931.png]] this is the tutorial view after ng serve
					![[Pasted image 20250410215956.png]]
					And this is from my version.
	Works fine and opens the default Angular project.
*tutorial 14min, used time 1h* 

==Tutorial Issue(1)==
	The tutorial uses app.module.ts, so not the latest way of doing angular.

Setting up Angular to use HTTPS
	?Check CORS and API configuration
	Create ssl folder in client
		Copy certificates from studentassets in this folder
		Open server.crt
			1. Click on the button "Install Certificate"
			2. Select wether you want to store it on user level or on machine level (chose user level)
			3. Click next
			4. Select Place all certificates in the following store
			5. click browse
			6. select trusted root certification authorities
			7. click ok
			8. click next
			9. click finish
	In angular.json add:
	        },
	        "serve": {
	          "builder": "@angular-devkit/build-angular:dev-server",
	          "configurations": {
	            "production": {
	              "buildTarget": "client:build:production"
	            },
	            "development": {
	              "buildTarget": "client:build:development",
	              "sslKey": "ssl/server.key",
	              "sslCert": "ssl/server.crt",
	              "ssl": true
	            }
	          },
	          "defaultConfiguration": "development"
	        },
	==Tutorial Issue(2)==
		Certificates that were provided have an old expiry date, and as such have already expired. Looking into this, it seems that existing certs expiry date is not changeable. Some corporate certs have an expiry time of one year, self signed certifications can have as long expiry as you want. Now I must make my own certificate. I stumbled upon a site called OpenSSL. 
	Certificates (Creating a new certificate for the angular client)
		*[ssl - How to install OpenSSL in windows 10? - Stack Overflow](https://stackoverflow.com/questions/50625283/how-to-install-openssl-in-windows-10)*
		![[Pasted image 20250414195320.png]]
		Inside the client/ssl folder ->
		Copy from studentassets the openssl-custom.cnf file inside the folder ->
		This was made using git bash, with the following commands:
			Enter Git Bash in start menu and start ->
			Navigate to the ssl folder ->
			Enter ->
			#!bin/bash
			.
			openssl req \
			    -newkey rsa:2048 \
			    -x509 \
			    -nodes \
			    -keyout server.key \
			    -new \
			    -out server.crt \
			    -config ./openssl-custom.cnf \
			    -sha256 \
			    -days 1095
			    /
			With the found openssl-custom.cnf from studentassets folder.
				[req]
				default_bits = 2048
				prompt = no
				default_md = sha256
				x509_extensions = v3_req
				distinguished_name = dn				
				[dn]
				C = US
				ST = KS
				L = Olathe
				O = IT
				OU = IT Department
				emailAddress = webmaster@example.com
				CN = localhost				
				[v3_req]
				subjectAltName = @alt_names				
				[alt_names]
				DNS.1 = *.localhost
				DNS.2 = localhost
		Issue has been solved, and we now have a working certificate, and with a working https angular localhost.
			![[Pasted image 20250414201202.png]]
*tutorial 27min, used time 1,5h* 

Adding Bootstrap / Font-Awesome
	Bootstrap is controversial due to its jQUery library, and the click is that why woud you use another library if you're using angular. We will use ngx-bootstrap that uses angular components rather than jQuery.
	==Tutorial Issue(3)==
		The ngx-bootstrap designed for angular only supports angular vesion 18.x.x, and in documentation there is encouragement/insisting of using the modular approach instead of a stand-alone approach.*(Check links for more on stand-alone vs modular)*
	[🅰️ Integrating Bootstrap 5 with Angular 19 in 2025 🚀 | Techiediaries](https://www.techiediaries.com/angular-bootstrap/)
	*[Angular powered Bootstrap](https://ng-bootstrap.github.io/#/home)*
	Installing the ng-bootstrap instead of ngx-bootstrap
		ng add @ng-bootstrap/ng-bootstrap
			![[Pasted image 20250414210818.png]]
	Installing font-awesome
		npm install font-awesome
	Some vulnerabilities found in vite		
		 npm audit report
			vite  6.2.0 - 6.2.5
			Severity: moderate
			Vite has an `server.fs.deny` bypass with an invalid `request-target` - https://github.com/advisories/GHSA-356w-63v5-8wf4
			fix available via `npm audit fix --force`
			Will install @angular-devkit/build-angular@19.2.0, which is a breaking change
			node_modules/@angular/build/node_modules/vite
			  @angular/build  >=19.2.1
			  Depends on vulnerable versions of vite
			  node_modules/@angular/build
			    @angular-devkit/build-angular  >=19.2.1
			    Depends on vulnerable versions of @angular/build
			    node_modules/@angular-devkit/build-angular			
			3 moderate severity vulnerabilities			
			To address all issues (including breaking changes), run:
			  npm audit fix --force
		After fix:
			Lots of updates, dont know if something broke or nor, we'll see.
			Works fine for now, bootstrap is working also.
				▲ [WARNING] Deprecation [plugin angular-sass]
			    src/styles.scss:4:8:
			      4 │ @import 'bootstrap/scss/bootstrap'; 
				  Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
				  More info and automated migrator: https://sass-lang.com/d/import
				  The plugin "angular-sass" was triggered by this import
Setting up VS Code for Angular
	Adding VS Code extensions useful for Angular
		Angular Language Service
			Provides Intellisense and autocomplete
		Angular Snippets
			By John Papa
		Prettier - Code formatter
		Bracket Pair Colorizer 2
			Depreciated and is now built into VS Code - no need to install
		TSLint
			Depreciated - ESLint is recommended
			*[Migrate from TSLint to ESLint | Visual Studio Code Extension API](https://code.visualstudio.com/api/advanced-topics/tslint-eslint-migration)*
	Restart the editor
		ctrl + shft + p
			-> Developer Reload Window
*tutorial 42min, used time 1h* 


---

***node commands:**
	nvm ls
	npm install -g @angular/cli
	npm audit
	npm install font-awesome
	 npm audit fix --force
	 npm audit fix
**angular commands:**
	ng version (Check the installed Angular CLI version)
	ng new client
	ng serve
	ctrl + c (stop the angular server)
	ng add @ng-bootstrap/ng-bootstrap	
**Git Bash commands**
	 openssl req     -newkey rsa:2048     -x509     -nodes     -keyout server.key     -new     -out server.crt     -config ./openssl-custom.cnf     -sha256     -days 1095
**Power Shell/Command Prompt commands**
	winget -v
	winget search openssl
***Git commands***
	git rm -r --cached client/ssl
	git add .
	git commit -m "Commit Message"

---

Tutorial Issues(1,2,3)
Notes(1,2,3,4)

---
*Start Date: 11.04.2025
*End Date: 14.04.2025*
*Time Spent: 3,5h*
	*Setup: *
	*Notes *
	*Video*
*Tutorial Video length: 42min*

*About time management:* 
"Some issues with tutorial, some extra things to learn aside from tutorial."

---
*Tutorial link:*
*[Angular Setup in .net core Part 9](https://www.youtube.com/watch?v=mtJbDAedzDI&list=PLaR3RrvBxlc3c8NAtlAXRwx43ZdH8eBrQ&index=10)*

*Related links:*
*[A Definitive Guide on How to configure SSL locally in Angular](https://www.angularjswiki.com/angular/how-to-configure-ssl-locally-in-angular/)*
*[Change expiration date of certificates - Windows Server | Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/windows-server/certificates-and-public-key-infrastructure-pki/change-certificates-expiration-date)*
*[windows server 2008 - change the expiration date on self-signed certificates? - Server Fault](https://serverfault.com/questions/5129/change-the-expiration-date-on-self-signed-certificates)*
*[Can self-signed SSL certificate be renewed? How? - Super User](https://superuser.com/questions/622434/can-self-signed-ssl-certificate-be-renewed-how)*
*[OpenSSL Library](https://openssl-library.org/)*
*[How to Install OpenSSL on Windows 10 & 11: A Complete Guide | Windows Forum](https://windowsforum.com/threads/how-to-install-openssl-on-windows-10-11-a-complete-guide.351961/)*
[ssl - How to install OpenSSL in windows 10? - Stack Overflow](https://stackoverflow.com/questions/50625283/how-to-install-openssl-in-windows-10)
	*- this might be the best one, it uses git bash, and it has openssl included, no need to install anything else*
*[Angular Bootstrap](https://valor-software.com/ngx-bootstrap/documentation#getting-started)*
	ngx-bootstrap
*[Angular powered Bootstrap](https://ng-bootstrap.github.io/#/home)*
	ng-bootstrap
*[🅰️ Integrating Bootstrap 5 with Angular 19 in 2025 🚀 | Techiediaries](https://www.techiediaries.com/angular-bootstrap/)*
*https://sass-lang.com/d/import*
*[Migrate from TSLint to ESLint | Visual Studio Code Extension API](https://code.visualstudio.com/api/advanced-topics/tslint-eslint-migration)*
*Interesting links:*
*[Angular Unchained: Standalone Components vs. Modular Architecture — A Deep Dive | by Shubham Sharma | Medium](https://medium.com/@shubh9911am/angular-unchained-standalone-components-vs-modular-architecture-a-deep-dive-d1da47e05aa0)*