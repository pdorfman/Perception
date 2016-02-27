# Perception Bills of Materials Exercise
This repository contains all of the artifacts I have created for the "Bill of Materials" technical exercise. Below you will find a short description of each asset, as well as technologies leveraged, and the known issue you may encounter.

I thank you for the opportunity to show you my wares, and hope you enjoy!

## Hosted Solution
The solution has been [deployed to heroku](https://dry-inlet-34561.herokuapp.com/) for easy viewing.

## PerceptionBOMs-0.0.1-SNAPSHOT.war 

This WAR was built with Maven from the source code residing in this repo as of the final commit. This WAR is ready to deploy to an application server. There are no server-specific configuration steps necessary.

The context root of the application is "/PerceptionBOMs".

### Environment Requirements
* JRE 7
  * I updated the project Java compiler compliance to Java SE JRE 1.7, though I have only tested on my local environment running Java 8.
* Tomcat 8


## PerceptionBOMs Directory
This directory contains the eclipse project and full source for the application. There is a pom.xml that should allow building of the application with Maven.

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

With the app deployed to my local environment running Java 8 on Tomcat 8.0, I have successfully tested on the latest versions of Chrome, Firefox, and Safari, though I have not tested on any version of IE.
