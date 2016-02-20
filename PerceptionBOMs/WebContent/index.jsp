<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Perception BOMs</title>


    <!-- CSS -->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootswatch/3.2.0/sandstone/bootstrap.min.css">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">

	<!--  JS -->
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script> -->
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
	<script src="js/libraries/angular/angu-fixed-header-table.js"></script>
	<script src="js/app.js"></script>
</head>

<body>
    <div class="container" ng-app="perceptionBOMs" ng-controller="mainController">

        <div class="alert alert-info">
            <p>Sort Type: {{ sortType }}</p>
            <p>Sort Reverse: {{ sortReverse }}</p>
            <p>Search Query: {{ searchFish }}</p>
            <p><a href="#" ng-click="newData()">New Data</a></p>
        </div>

        <table class="scroll table table-bordered table-striped" fixed-header>

            <thead>
                <tr>
                    <th>
			          <a href="#" ng-click="sortType = 'name'; sortReverse = !sortReverse">
			            Sushi Roll 
			            <span ng-show="sortType == 'name'" class="fa fa-caret-down"></span>
			          </a>
			        </th>
                    <th>Fish Type</th>
                    <th>Taste Level</th>
                </tr>
            </thead>

            <tbody>
                <tr ng-repeat="roll in sushi | orderBy:sortType:sortReverse">
                    <td>{{ roll.name }}</td>
                    <td>{{ roll.fish }}</td>
                    <td>{{ roll.tastiness }}</td>
                </tr>
            </tbody>
            
		    <tfoot>
		        <tr>
		            <td>Footer 1</td>
		            <td>Footer 2</td>
		            <td>Footer 3</td>
		        </tr>
		    </tfoot>

        </table>

    </div>

</body>
</html>