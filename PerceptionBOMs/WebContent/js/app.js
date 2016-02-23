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


    // BOM UI manipulation
    $scope.createBOM = function(){
    	var isCreate = true;
    	if($scope.selectedBOM.number != null){
    		isCreate = confirm("To create a new BOM, you will lose any changes to the currently selected BOM.\nWould you like to continue?");
    	}

    	if(isCreate){
        	resetPartSelection();
        	resetSelectedBOM();
        	openBOMDetail();
    	}
    };
    
    $scope.editBOM = function(bom){
    	resetPartSelection();
    	$scope.selectedBOM = bom;
    	openBOMDetail();
    };
    
    $scope.cancelBOM = function(){
    	closeBOMDetail();
    	getBOMs();
    };
    
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
    

    $scope.saveBOM = function(){
    	console.log("Save BOM...");
    	console.log($scope.selectedBOM);
    	
    	if($scope.selectedBOM.number == null){
    		console.log("rest/bomService/boms");
	    	$http.post("rest/bomService/boms", $scope.selectedBOM).success( function(response){
	    		console.log("POST RESPONSE");
	    		console.log(response);
	    		
	    		if(response.status == 'success'){
		        	closeBOMDetail();
		        	getBOMs();
	    		}
	        	resultMessage(response);
	    	});
    	}else{
    		console.log("rest/bomService/boms/" + $scope.selectedBOM.number);
	    	$http.put("rest/bomService/boms/" + $scope.selectedBOM.number, $scope.selectedBOM).success( function(response){
	    		console.log("POST RESPONSE");
	    		console.log(response);

	    		if(response.status == 'success'){
		        	closeBOMDetail();
		        	getBOMs();
	    		}
	        	resultMessage(response);
	    	});
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
    }
    
    function closeBOMDetail(){
    	enableButtons();
    	resetSelectedBOM();
    	$scope.showBomDetail = false;
    }
    
    function openBOMDetail(){
    	$scope.showBomDetail = true;
    	disableButtons();
    }
    
    function resetPartSelection(){
    	console.log('reset Parts');
    	$scope.partType = "";
    	$scope.partsFilter = "";
    	$scope.part = "";
    	$scope.quantity = "";
    }
    
    function resetSelectedBOM(){
    	console.log('reset BOM');
    	$scope.selectedBOM = {
    			number : null,
    			description : null,
    			parts : []
    	};
    }
    
    function resultMessage(response){
    	var msg;
    	if(response.status == "success"){
    		msg = 'Success!\n\n';
    	}else{
    		msg = 'We encountered a problem:\n\n';
    	}
        angular.forEach(response.messages, function(value) {
			msg += '- ' + value + '\n';
    	});
    	alert(msg);
    }
    
    function disableButtons(){
    	angular.element(document.querySelector('#createButton')).addClass('disabled');
    	angular.element(document.querySelectorAll('#bomsList .btn')).addClass('disabled');
    }
    
    function enableButtons(){
    	angular.element(document.querySelector('#createButton')).removeClass('disabled');
    	angular.element(document.querySelectorAll('#bomsList .btn')).removeClass('disabled');
    }
  
});
