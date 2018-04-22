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
                $location.path("/");
            },function(){
                 $scope.status="Error 400: debe completar todos los campos"
            });
        };


    }]);
