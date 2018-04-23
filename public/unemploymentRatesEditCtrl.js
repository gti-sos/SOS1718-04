/* global angular*/
angular
    .module("UnemploymentRatesApp")
    .controller("unemploymentRatesEditCtrl", ["$scope", "$http","$routeParams","$location", function($scope, $http, $routeParams,$location) {
        console.log("EditCtrl initialized!");
        var unemploymentRatesURL = "/api/v1/unemployment-rates/"+$routeParams.province+"/"+$routeParams.year;
        
        $http.get(unemploymentRatesURL).then(function (response){
            $scope.updatedUnemploymentRate = response.data;
        });
        
        $scope.updateUnemploymentRate = function() {
            $http.put(unemploymentRatesURL, $scope.updatedUnemploymentRate).then(function doneFilter(response) {
                $scope.status = "Status: " + response.status;
                $location.path("/");
                window.alert("El recurso se ha editado con exito, gracias!");
            }, function failFilter(response) {
                if (response.status == 400) {
                    window.alert("Debes respetar los campos obligatorios gracias!");
                }
            });
        };


    }]);
