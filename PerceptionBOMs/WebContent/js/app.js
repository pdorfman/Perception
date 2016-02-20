angular.module('perceptionBOMs', ['anguFixedHeaderTable'])

.controller('mainController', function($scope) {
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term
  
    // create the list of sushi rolls 
    $scope.sushi = [
        { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
        { name: 'Philly', fish: 'Tuna', tastiness: 4 },
        { name: 'Tiger', fish: 'Eel', tastiness: 7 },
        { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
    ];
    
    $scope.newData = function(){
        $scope.sushi = [
                        { name: 'Cali Roll2', fish: 'Crab', tastiness: 2 },
                        { name: 'Philly2', fish: 'Tuna', tastiness: 4 },
                        { name: 'Tiger2', fish: 'Eel', tastiness: 7 },
                        { name: 'Rainbow2', fish: 'Variety', tastiness: 6 }
                    ];
    }
  
});
