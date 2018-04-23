/* global angular*/
angular
    .module("UnemploymentRatesApp")
    .controller("unemploymentRatesEditCtrl", ["$scope", "$http","$routeParams","$location", function($scope, $http, $routeParams,$location) {
        console.log("EditCtrl initialized!");
        var unemploymentRatesURL = "/api/v1/unemployment-rates/"+$routeParams.province+"/"+$routeParams.year;
        
        $http.get(unemploymentRatesURL).then(function (response){
            $scope.updatedUnemploymentRate = response.data;
        });
        
        $scope.updateUnemploymentRate = function (){
            $http.put(unemploymentRatesURL,$scope.updatedUnemploymentRate).then(function (response){
                $scope.status = "Status: " + response.status;
                console.log("entra 1 ----- "+unemploymentRatesURL);
                $location.path("/");
            },function(){
                    if($scope.updatedUnemploymentRate["illiterate"]==null||
                    $scope.updatedUnemploymentRate["first-grade"]==null||
                    $scope.updatedUnemploymentRate["second-grade"]==null||
                    $scope.updatedUnemploymentRate["third-degree"]==null||
                    $scope.updatedUnemploymentRate["min-age"]==null||
                    $scope.updatedUnemploymentRate["max-age"]==null){
                    $scope.status="Error 400: debe completar todos los campos"
                    }
                    console.log("entra 2 ---- "+unemploymentRatesURL);
            });
        };


    }]);
