/* global angular*/
angular
    .module("UnemploymentRatesApp")
    .controller("unemploymentRatesEditCtrl", ["$scope", "$http","$routeParams","$location", function($scope, $http, $routeParams,$location) {
        console.log("EditCtrl initialized!");
        var unemploymentRatesURL = "/api/v1/unemployment-rates/"+$routeParams.province+"/"+$routeParams.year;
        
        $http.get(unemploymentRatesURL).then(function (response){
            console.log("---------_ "+response.status);
            console.log("---------_ "+unemploymentRatesURL);
            $scope.updatedUnemploymentRate = response.data;
        });
        
        $scope.updateUnemploymentRate = function (){
            $http.put(unemploymentRatesURL,$scope.updatedUnemploymentRate).then(function (response){
                $scope.status = "Status: " + response.status;
                $location.path("/");
            },function(){
                    if($scope.unemploymentRatesURL["illiterate"]==null||
                    $scope.unemploymentRatesURL["first-grade"]==null||
                    $scope.unemploymentRatesURL["second-grade"]==null||
                    $scope.unemploymentRatesURL["third-degree"]==null||
                    $scope.unemploymentRatesURL["min-age"]==null||
                    $scope.unemploymentRatesURL["max-age"]==null){
                    $scope.status="Error 400: debe completar todos los campos"
                    }
                    });
        };


    }]);
