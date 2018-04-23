/*global angular*/
angular.module("GraduationRatesApp")
  .controller("graduationRatesEditCtrl", ["$scope","$http","$routeParams","$location", function($scope,$http,$routeParams,$location) {
            console.log("Edit Ctrl initialized!");
            var stadisticUrl = "/api/v2/graduation-rates/"+$routeParams.province+"/"+$routeParams.year;
                $http.get(stadisticUrl).then(function (response){
                    $scope.updatedStadistic= response.data;
                });
                $scope.updateStadistic= function(){
                $http.put(stadisticUrl,$scope.updatedStadistic).then(function (response){
                    $scope.status= "Status: "+ response.status;
                    console.log(Object.keys($scope.updatedStadistic).length)
                    $location.path("/");
                },function(){
                    if($scope.updatedStadistic["illiterate"]==null||
                    $scope.updatedStadistic["first-grade"]==null||
                    $scope.updatedStadistic["second-grade"]==null||
                    $scope.updatedStadistic["third-degree"]==null||
                    $scope.updatedStadistic["min-age"]==null||
                    $scope.updatedStadistic["max-age"]==null){
                    $scope.status="Error 400: debe completar todos los campos"
                    }
                    });
                    $location.path("/");
            }
            
            
        }]);