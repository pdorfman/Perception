<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Perception BOMs</title>

    <!-- CSS -->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootswatch/3.2.0/sandstone/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">

	<!-- JS -->
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
	<script src="js/libraries/angular/angu-fixed-header-table.js"></script>
	<script src="js/app.js"></script>
	
</head>

<body>

    <img id="logo" src="https://www.perceptionsoftware.com/wp-content/themes/perception/images/logo.png">
    
    
    <!-- Angular App Container -->
    <div class="container" ng-app="perceptionBOMs" ng-controller="mainController">
  
        
        <!-- BOMs LIST -->
        
        <div class="well" ng-show="!showBOMDetail">
        
            <div class="wellTitle">
                <span>Bills of Materials</span>
                <div id="createButton" class="btn btn-success btn-sm" ng-click="createBOM()">Create New BOM</div>
            </div>
            
	        <table ng-show="boms.length" id="bomsList" class="scroll table table-condensed table-bordered table-striped table-hover warning" fixed-header>
	
	            <thead>
	                <tr>
	                    <th>
                            <span class="sortLink" ng-click="sort.boms.type = 'number'; sort.boms.reverse = !sort.boms.reverse">
		                        BOM Number
						        <span ng-show="sort.boms.type == 'number' && !sort.boms.reverse">&or;</span>
						        <span ng-show="sort.boms.type == 'number' && sort.boms.reverse">&and;</span>
                            </span>
	                    </th>
                        <th>
                            <span class="sortLink" ng-click="sort.boms.type = 'description'; sort.boms.reverse = !sort.boms.reverse">
	                            Description
	                            <span ng-show="sort.boms.type == 'description' && !sort.boms.reverse">&or;</span>
	                            <span ng-show="sort.boms.type == 'description' && sort.boms.reverse">&and;</span>
                            </span>
                        </th>
                        <th>Actions</th>
	                </tr>
	            </thead>
	
	            <tbody>
	                <tr ng-repeat="bom in boms | orderBy:sort.boms.type:sort.boms.reverse">
	                    <td>{{ bom.number }}</td>
                        <td>{{ bom.description }} <span class="lightText">({{bom.parts.length}} component parts and {{sumParts(bom.parts, "quantity")}} total pieces)</span></td>
                        <td>
                            <div class="btn btn-info btn-xs" ng-click="editBOM(bom)">edit</div>
                            <div class="btn btn-danger btn-xs" ng-click="deleteBOM(bom)">delete</div>
                        </td>
	                </tr>
	            </tbody>
	
	        </table>
	        <div ng-show="!boms.length" class="alert alert-warning">You currently have no saved BOMS. Please click the link above to get started!</div>
	        
        </div>
        
        
        <!-- PARTS DETAIL -->
        
        <div class="well" ng-show="showBOMDetail">
        
            <div class="wellTitle">
                <span ng-show="selectedBOM.number">Bill of Materials Parts Detail <span class="subtext">({{selectedBOM.number}})</span> </span>
                <span ng-show="!selectedBOM.number">New Bill of Materials</span>
            </div>
            
            
            <!-- ADD NEW PART -->
            
            <input id="bomDescriptionInput" ng-model="selectedBOM.description" type="text" placeholder="Description" required/>
            <br>
        
            Add a part: 
            <select id="partTypeSelect" ng-model="partType">
                <option ng-repeat="part in partTypes" value="{{part.value}}">{{part.label}}</option>
            </select>
            
            <div ng-show="partType" style="display: inline;">
	            <input id="partFilter" type="text" ng-model="partsFilter" placeholder="Filter Parts (optional)" title="Enter text to filter the parts drop-down list to the right">
	            &harr;
	            <select id="partSelect" ng-model="part" ng-options="part as part.description for part in parts[partType] | filter:{description : partsFilter}">
	            </select>
            </div>

            <input class="quantityInput" ng-model="quantity" type="number" id="quantityInput" ng-show="part" placeholder="Qty" min="1" integer />
            <div class="btn btn-success btn-xs" ng-show="quantity > 0 && part" ng-click="addPart()">Add Part(s)</div>
            
            <br/>
            
            
            <!-- EXISTING PARTS -->
            
            <table id="partsList" ng-show="selectedBOM.parts.length"  class="scroll table table-condensed table-bordered table-striped table-hover warning" fixed-header>
   
                <thead>
                    <tr>
                        <th>
                            <span class="sortLink" ng-click="sort.parts.type = 'number'; sort.parts.reverse = !sort.parts.reverse">
                                Corporate Part Number
                                <span ng-show="sort.parts.type == 'number' && !sort.parts.reverse">&or;</span>
                                <span ng-show="sort.parts.type == 'number' && sort.parts.reverse">&and;</span>
                            </span>
                        </th>
                        <th>
                            <div class="sortLink" ng-click="sort.parts.type = 'type'; sort.parts.reverse = !sort.parts.reverse">
                                Type
                                <span ng-show="sort.parts.type == 'type' && !sort.parts.reverse">&or;</span>
                                <span ng-show="sort.parts.type == 'type' && sort.parts.reverse">&and;</span>
                            </div>
                        </th>
                        <th>
                            <div class="sortLink" ng-click="sort.parts.type = 'description'; sort.parts.reverse = !sort.parts.reverse">
                                Description
                                <span ng-show="sort.parts.type == 'description' && !sort.parts.reverse">&or;</span>
                                <span ng-show="sort.parts.type == 'description' && sort.parts.reverse">&and;</span>
                            </div>
                        </th>
                        <th>
                            Qty
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr ng-repeat="thisPart in selectedBOM.parts | orderBy:sort.parts.type:sort.parts.reverse">
                        <td><a href="{{thisPart.datasheetURL}}" target="_blank" title="Click to view datasheet">{{ thisPart.number }}</a></td>
                        <td>{{ thisPart.type }}</td>
                        <td>
                            <a class="imageLink" href="{{thisPart.imageURL}}" target="_blank">
                                <img class="imageIcon" ng-src="{{thisPart.imageURL}}" title="Click to view full size image"> 
                            </a>
                                {{ thisPart.description }}</td>
                        <td>
                            <input class="quantityInput" type="number" ng-model="thisPart.quantity" min="1" integer />
                        </td>
                        <td>
                            <div class="btn btn-danger btn-xs" ng-click="removePart(thisPart)">remove</div>
                        </td>
                    </tr>
                </tbody>
    
            </table>
            <div ng-show="!selectedBOM.parts.length" class="alert alert-warning">This BOM currently has no parts. Please add a part above!</div>
               
            <div class="btn btn-success btn-sm" ng-click="saveBOM()">Save</div>
            <div class="btn btn-danger btn-sm" ng-click="cancelBOM()">Cancel</div>
        </div>
        
        
    </div>

</body>
</html>