/*global angular*/
angular
    .module("RoRoMonApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/analytics",{
                    templateUrl:"analytics.html",
                })
                .when("/graduation-rates",{
                    templateUrl:"graduationRatesList.html",
                    controller: "graduationRatesListCtrl"
                })
                .when("/graduation-rates/stadistic/:province/:year",{
                    templateUrl:"graduationRatesEdit.html",
                    controller: "graduationRatesEditCtrl"
                })
                .when("/graduation-rates/analytics",{
                    templateUrl:"vistasGraduationRates.html",
                    controller: "vistasGraduationRatesCtrl"
                })
                .when("/unemployment-rates",{
                    templateUrl:"unemploymentRatesList.html",
                    controller: "unemploymentRatesListCtrl"
                })
                .when("/unemployment-rates/:province/:year",{
                    templateUrl:"unemploymentRatesEdit.html",
                    controller: "unemploymentRatesEditCtrl"
                })
                .when("/unemployment-rates/analytics",{
                    templateUrl:"vistasUnemploymentRates.html",
                    controller: "vistasUnemploymentRatesCtrl"
                });
                
    });