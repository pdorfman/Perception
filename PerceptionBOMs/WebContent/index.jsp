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

        <div class="well">
            <div id="bomTitle">
                <span>Bills of Materials</span>
                <div id="createButton" class="btn btn-success btn-sm" ng-click="createBOM()">Create New BOM</div>
            </div>
            
            
	        <table id="bomsList" class="scroll table table-condensed table-bordered table-striped table-hover warning" fixed-header>
	
	            <thead>
	                <tr>
	                    <th width="200">
	                      <span class="sortLink" ng-click="sortType = 'number'; sortReverse = !sortReverse">
	                        BOM Number
					        <span ng-show="sortType == 'number' && !sortReverse" class="fa fa-caret-down"></span>
					        <span ng-show="sortType == 'number' && sortReverse" class="fa fa-caret-up"></span>
	                      </span>
	                    </th>
                        <th>Description</th>
                        <th width="150">Actions</th>
	                </tr>
	            </thead>
	
	            <tbody>
	                <tr ng-repeat="bom in boms | orderBy:sortType:sortReverse">
	                    <td>{{ bom.number }}</td>
                        <td>{{ bom.description }} with {{bom.parts.length}} component parts and {{sumParts(bom.parts, "quantity")}} total pieces</td>
                        <td>
                            <div class="btn btn-info btn-xs" ng-click="editBOM(bom)">edit</div>
                            <div class="btn btn-danger btn-xs">delete</div>
                        </td>
	                </tr>
	            </tbody>
	
	        </table>
	        <div ng-show="!boms.length" class="alert alert-warning">You currently have no saved BOMS. Please click the link above to get started!</div>
	        
	        
	        <div ng-show="showBomDetail">
	            <div id="bomTitle">
	                <span ng-show="selectedBOM.number">BOM Detail (&num;{{selectedBOM.number}})</span>
	                <span ng-show="!selectedBOM.number">New BOM Detail</span>
	            </div>
                <input id="bomDescriptionInput" ng-model="selectedBOM.description" type="text" placeholder="Description"/>
                <br>
                
                Add a part: 
                <select id="partTypeSelect" ng-model="partType">
                    <option ng-repeat="part in partTypes" value="{{part.value}}">{{part.label}}</option>
                </select>
                
                <input type="text" ng-model="partsFilter" ng-show="partType" placeholder="Filter Parts (optional)">
                
                <select id="partSelect" ng-model="part" ng-show="partType" ng-options="part as part.description for part in parts[partType] | filter:{description : partsFilter}">
                </select>

                <input id="quantityInput" ng-model="quantity" type="number" id="quantityInput" ng-show="part" placeholder="Qty"/>
                <div class="btn btn-success btn-xs" ng-show="quantity > 0 && part" ng-click="addPart()">Add Part(s)</div>
                
                <br/>
                
                <table class="scroll table table-condensed table-bordered table-striped table-hover warning" fixed-header>
    
	                <thead>
	                    <tr>
	                        <th width="200">
	                          <span>
	                            Part Number
	                          </span>
	                        </th>
                            <th>Description</th>
                            <th>Qty</th>
	                        <th width="150">Actions</th>
	                    </tr>
	                </thead>
	    
	                <tbody>
	                    <tr ng-repeat="thisPart in selectedBOM.parts">
	                        <td>{{ thisPart.partNumber }}</td>
                            <td>{{ thisPart.description }}</td>
                            <td>{{ thisPart.quantity }}</td>
	                        <td>
	                            <div class="btn btn-danger btn-xs" ng-click="removePart(thisPart.partNumber)">delete</div>
	                        </td>
	                    </tr>
	                </tbody>
	    
	            </table>
                
	            <div class="btn btn-success btn-sm" ng-click="saveBOM()">Save</div>
	            <div class="btn btn-danger btn-sm" ng-click="cancelBOM()">Cancel</div>
            </div>
            
        </div>
    </div>

</body>
</html>