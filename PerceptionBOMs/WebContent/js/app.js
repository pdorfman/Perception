angular.module('perceptionBOMs', ['anguFixedHeaderTable'])

.controller('mainController', function($scope, $http) {
	
	var SERVICE_BASE_PATH = "rest/bomService";
	
	// initialize bom list sort
    $scope.sortType     = 'number';
    $scope.sortReverse  = false;
    $scope.searchFilter = '';

    // Initialize UI
    $scope.showBOMDetail = false;
    
    // Initialize data model
    $scope.parts = {};		// map for parts lookup
    $scope.partTypes = [];	// part types list for select
    $scope.boms = [];		// currently saved BOMS list
    $scope.selectedBOM = {};// BOM currently editing
    resetSelectedBOM();
    
    // Retrieve data
    loadParts();
    loadBOMs();


    /*---- BOM persistence -----*/
    
    $scope.createBOM = function(){
    	var isCreate = true;
    	if($scope.selectedBOM.number != null){
    		isCreate = confirm("To create a new BOM, you will lose any changes to the currently selected BOM.\nWould you like to continue?");
    	}

    	if(isCreate){
        	resetPartSelection();
        	resetSelectedBOM();
        	showBOMDetail();
    	}
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
    	
    	if($scope.selectedBOM.number == null){
    		// Create new BOM
    		var url = SERVICE_BASE_PATH + "/boms";
    		console.log("POST " + url);
	    	$http.post(url, $scope.selectedBOM).success( function(response){
	    		console.log("POST RESPONSE");
	    		console.log(response);
	    		
	    		if(response.status == 'success'){
		        	hideBOMDetail();
		        	loadBOMs();
	    		}
	        	displayResponseMessage(response);
	    	});
    	}else{
    		// Update existing BOM
    		var url = SERVICE_BASE_PATH + "/boms/" + $scope.selectedBOM.number;
    		console.log("PUT " + url);
	    	$http.put(url, $scope.selectedBOM).success( function(response){
	    		console.log("PUT RESPONSE");
	    		console.log(response);

	    		if(response.status == 'success'){
		        	hideBOMDetail();
		        	loadBOMs();
	    		}
	        	displayResponseMessage(response);
	    	});
    	}
    };
    

    /*---- Parts Manipulation -----*/
    
    $scope.addPart = function(){
    	console.log($scope.part);
    	
    	// Check if part already in this BOM
    	var partInBOM = false;
    	var bomPart = null;
        angular.forEach($scope.selectedBOM.parts, function(value, key) {
        	if(value.partNumber == $scope.part.partNumber){
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
    
    $scope.removePart = function(number){
    	console.log(number);
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
        $http.get(SERVICE_BASE_PATH + "/parts").success( function(response) {
        	
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
    
    function loadBOMs(){
        $http.get(SERVICE_BASE_PATH + "/boms").success( function(response){
            console.log('boms ajax result: ');
            console.log(response);
        	$scope.boms = response;
        });
    }
    
    function hideBOMDetail(){
    	enableButtons();
    	resetSelectedBOM();
    	$scope.showBOMDetail = false;
    }

    function showBOMDetail(){
    	$scope.showBOMDetail = true;
    	disableButtons();
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
    	$scope.quantity = "";
    }
    
    function disableButtons(){
    	angular.element(document.querySelector('#createButton')).addClass('disabled');
    	angular.element(document.querySelectorAll('#bomsList .btn')).addClass('disabled');
    }
    
    function enableButtons(){
    	angular.element(document.querySelector('#createButton')).removeClass('disabled');
    	angular.element(document.querySelectorAll('#bomsList .btn')).removeClass('disabled');
    }
    
    function displayResponseMessage(response){
    	var msg;
    	if(response.status == "success"){
    		msg = 'Success!\n';
    	}else{
    		msg = 'We encountered a problem:\n';
    	}
        angular.forEach(response.messages, function(value) {
			msg += '- ' + value + '\n';
    	});
    	alert(msg);
    }
  
});
