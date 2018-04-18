/*global angular*/
angular
    .module("GraduationRatesApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                    templateUrl:"graduationRatesList.html",
                    controller: "graduationRatesListCtrl"
                })
                .when("/stadistic/:province/:year",{
                    templateUrl:"graduationRatesEdit.html",
                    controller: "graduationRatesEditCtrl"
                });
    });