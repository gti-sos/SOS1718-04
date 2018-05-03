/*global angular*/
angular
    .module("RoRoMonApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/analytics",{
                    templateUrl:"analytics.html",
                })
                .when("/graduationRates",{
                    templateUrl:"graduationRatesList.html",
                    controller: "graduationRatesListCtrl"
                })
                .when("/graduationRates/stadistic/:province/:year",{
                    templateUrl:"graduationRatesEdit.html",
                    controller: "graduationRatesEditCtrl"
                })
                
    });