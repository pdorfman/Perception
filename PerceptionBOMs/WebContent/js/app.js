angular.module('perceptionBOMs', ['anguFixedHeaderTable'])

.controller('mainController', function($scope, $http) {
	
	var SERVICE_BASE_PATH = "rest/bomService";
	
	// initialize sort
	$scope.sort = {
			boms : {
				type : 'number',
				reverse : false
			},
			parts : {
				type : 'number',
				reverse : false
			}
	};

    // Initialize UI
    $scope.showBOMDetail = false;
    
    // Initialize data model
    $scope.parts 		= {}; // map for parts lookup
    $scope.partTypes 	= []; // part types list for select
    $scope.boms 		= []; // currently saved BOMS list
    $scope.selectedBOM 	= {}; // BOM currently editing
    resetSelectedBOM();
    
    // Retrieve data
    loadParts();
    loadBOMs();


    /*---- BOM persistence -----*/
    
    $scope.createBOM = function(){
    	resetPartSelection();
    	resetSelectedBOM();
    	showBOMDetail();
    };
    
    $scope.editBOM = function(bom){
    	resetPartSelection();
    	$scope.selectedBOM = bom;
    	showBOMDetail();
    };
    
    $scope.cancelBOM = function(){
    	hideBOMDetail();
    	loadBOMs();
    };
    
    $scope.saveBOM = function(){
    	console.log("Save BOM...");
    	console.log($scope.selectedBOM);
    	
    	var httpMethod;
    	var url;
    	
    	if($scope.selectedBOM.number == null){
    		// Create new BOM
    		url = SERVICE_BASE_PATH + "/boms";
    		console.log("POST " + url);
    		httpMethod = $http.post;
    		
    	}else{
    		// Update existing BOM
    		url = SERVICE_BASE_PATH + "/boms/" + $scope.selectedBOM.number;
    		console.log("PUT " + url);
    		httpMethod = $http.put;
    	}
    	
    	httpMethod(url, $scope.selectedBOM).success( function(response){
    		console.log("saveBOM RESPONSE");
    		console.log(response);
    		
    		if(response.status == 'success'){
	        	hideBOMDetail();
	        	loadBOMs();
    		}
        	displayResponseMessage(response);
    	});
    	
    	
    };
    
    $scope.deleteBOM = function(bom){
    	if(confirm('Are you sure you want to delete this BOM?\nThis cannot be undone.')){
    		
    		// delete existing BOM
    		var url = SERVICE_BASE_PATH + "/boms/" + bom.number;
    		console.log("DELETE " + url);
    		
	    	$http.delete(url).success( function(response){
	    		console.log("DELETE RESPONSE");
	    		console.log(response);

	    		if(response.status == 'success'){
		        	hideBOMDetail();
		        	loadBOMs();
	    		}
	        	displayResponseMessage(response);
	    	});
    	}
    }
    

    /*---- Parts Manipulation -----*/
    
    $scope.addPart = function(){
    	// Check if part already in this BOM
    	var partInBOM = false;
    	var bomPart = null;
        angular.forEach($scope.selectedBOM.parts, function(value, key) {
        	if(value.number == $scope.part.number){
        		partInBOM = true;
        		bomPart = value;
        	}
    	});

        if(!partInBOM){
        	// add part
        	$scope.part.quantity = $scope.quantity;
        	$scope.selectedBOM.parts.push($scope.part);
        }else{
        	// confirm update quantity
            if(confirm('The BOM already contains this part. Would you like to update the quantity?')){
            	bomPart.quantity = $scope.quantity;
            }
        }
    };
    
    $scope.removePart = function(part){
    	console.log("delete part: " + $scope.selectedBOM.parts.indexOf(part));
    	console.log(part);
    	var index = $scope.selectedBOM.parts.indexOf(part);
    	$scope.selectedBOM.parts.splice(index, 1);     
    };
    
    $scope.sumParts = function (items, prop) {
        if (items == null) {
            return 0;
        }
        return items.reduce(function (a, b) {
            return b[prop] == null ? a : a + b[prop];
        }, 0);
    };

    
    /*----- "Private" functions -----*/
    
    function loadParts(){
    	console.log('Retrieving parts list');
        $http.get(SERVICE_BASE_PATH + "/parts").success( function(response) {
            
            // initialize the partTypes list
            $scope.partTypes.push( {label : "Select Type", value : ""} );
            angular.forEach(response, function(value, key) {
            	$scope.partTypes.push( {label : key.charAt(0).toUpperCase() + key.slice(1), value: key} );
        	});
            
            // Set full parts as map for easy select list population
            $scope.parts = response;
         });
    }
    
    function loadBOMs(){
    	console.log('Retrieving BOMs list');
        $http.get(SERVICE_BASE_PATH + "/boms").success( function(response){
        	$scope.boms = response;
        });
    }
    
    function hideBOMDetail(){
    	resetSelectedBOM();
    	$scope.showBOMDetail = false;
    }

    function showBOMDetail(){
    	$scope.showBOMDetail = true;
    }
    
    function resetSelectedBOM(){
    	console.log('reset BOM');
    	$scope.selectedBOM = {
    			number : null,
    			description : null,
    			parts : []
    	};
    }

    function resetPartSelection(){
    	$scope.partType = "";
    	$scope.partsFilter = "";
    	$scope.part = "";
    	$scope.quantity = 1;
    }
    
    function displayResponseMessage(response){
    	var msg;
    	if(response.status == "success"){
    		msg = 'Success!\n\n';
    	}else{
    		msg = 'We encountered a problem:\n\n';
    	}
        angular.forEach(response.messages, function(value) {
			msg += '* ' + value + '\n';
    	});
    	alert(msg);
    }
  
});
