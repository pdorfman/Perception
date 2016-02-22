angular.module('perceptionBOMs', ['anguFixedHeaderTable'])

.controller('mainController', function($scope, $http) {
	
	// initialize bom list sort
    $scope.sortType     = 'number'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFilter = '';     // set the default search/filter term

    // Initialize UI
    $scope.showBomDetail = false;     // set the default for showing detail
    
    // Initialize data model
    $scope.parts = {};		// map for lookup
    $scope.partTypes = [];	// part types list for select
    $scope.boms = [];		// currently saved BOMS list
    $scope.selectedBOM = {};
    
    resetSelectedBOM();
    getParts();
    getBOMs();


    // BOM manipulation
    $scope.createBOM = function(){
    	var isCreate = true;
    	if($scope.selectedBOM.number != null){
    		isCreate = confirm("If you continue, you will lose your entered changes. Would you like to continue?");
    	}

    	if(isCreate){
    		getBOMs();
        	resetPartSelection();
        	resetSelectedBOM();
        	$scope.showBomDetail = true;
    	}
    };
    
    $scope.editBOM = function(bom){
    	console.log(bom);
    	resetPartSelection();
    	$scope.selectedBOM = bom;
    	$scope.showBomDetail = true;
    };
    
    $scope.saveBOM = function(){
    };
    
    $scope.cancelBOM = function(){
    	$scope.showBomDetail = false;
    	getBOMs();
    };
    
    $scope.addPart = function(){
    	console.log($scope.part);
    	
    	var partInBOM = false;
    	var bomPart = null;
        angular.forEach($scope.selectedBOM.parts, function(value, key) {
        	if(value.partNumber == $scope.part.partNumber){
        		partInBOM = true;
        		bomPart = value;
        	}
    	});
        
    	
        if(!partInBOM){
        	$scope.part.quantity = $scope.quantity;
        	$scope.selectedBOM.parts.push($scope.part);
        }else{
            if(confirm('The BOM already contains this part. Would you like to update the quantity?')){
            	bomPart.quantity = $scope.quantity;
            }
        }
    	
    };
    
    
    // Utility functions
    
    $scope.sumParts = function (items, prop) {
        if (items == null) {
            return 0;
        }
        return items.reduce(function (a, b) {
            return b[prop] == null ? a : a + b[prop];
        }, 0);
    };

    
    // "Private" functions
    
    function getParts(){
        $http.get("rest/bomService/parts").success( function(response) {
        	
            console.log('parts ajax result: ');
            console.log(response);
            
            // initialize the partTypes list
            $scope.partTypes.push( {label : "Select Type", value : ""} );
            angular.forEach(response, function(value, key) {
            	$scope.partTypes.push( {label : key.charAt(0).toUpperCase() + key.slice(1), value: key} );
        	});
            
            // Set full parts map for later quick reference
            $scope.parts = response;
         });
    }
    
    function getBOMs(){
        $http.get("rest/bomService/boms").success( function(response){
            console.log('boms ajax result: ');
            console.log(response);
        	$scope.boms = response;
        });
    };
    
    function resetPartSelection(){
    	console.log('reset Parts');
    	$scope.partType = "";
    	$scope.partsFilter = "";
    	$scope.part = "";
    	$scope.quantity = "";
    };
    
    function resetSelectedBOM(){
    	console.log('reset BOM');
    	$scope.selectedBOM = {
    			number : null,
    			description : null,
    			parts : []
    	};
    };
  
});
