/*global angular*/
angular
    .module("MedicalAttentionRatesApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                    templateUrl:"medicalAttentionRatesList.html",
                    controller: "medicalAttentionRatesListCtrl"
                });
    });