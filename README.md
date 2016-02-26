# Perception Bills of Materials Exercise
This repository contains all of the artifacts I have created for the "Bill of Materials" technical exercise. Below you will find a short description of each asset, as well as technologies leveraged, and the known issue you may encounter.

I thank you for the opportunity to show you my wares, and hope you enjoy!

## PerceptionBOMs.war 
The web app is ready to deploy to an application server. The context root of the application is the default: "PerceptionBOMs". There are no server-specific configuration steps necessary - just plug and play! 

This WAR was exported from the source code residing in this repo as of the final commit.

## PerceptionBOMs Directory
This directory contains the eclipse project and full source for the application.

## Technologies Leveraged

### Front-end
1. [AngularJS](https://angularjs.org/) (for application MVC architecture and data-binding)
2. [angu-fixed-header-table.js](https://github.com/cornflourblue/angu-fixed-header-table) (Angular directive for scrollable table)
3. [Bootswatch Sandstone](https://bootswatch.com/sandstone/) (CSS theme for rapid initial styling)

### Back-end
1. Jersey for REST service
2. Jackson for producing/consuming JSON
3. [Opencsv](http://opencsv.sourceforge.net/) for reading CSVs

## Known Issues
I have leveraged the datasheet and image URLs from the parts CSVs. Some are invalid URLs, though I figured the feature was still worth including. 
