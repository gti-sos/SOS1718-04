/*global angular*/


/* PASADO */


angular
    .module("UnemploymentRatesApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                    templateUrl:"unemploymentRatesList.html",
                    controller: "unemploymentRatesListCtrl"
                })
                .when("/unemploymentRates/:province/:year",{
                    templateUrl:"unemploymentRatesEdit.html",
                    controller: "unemploymentRatesEditCtrl"
                });
    });