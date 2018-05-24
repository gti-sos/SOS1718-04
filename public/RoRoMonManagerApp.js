/*global angular*/
angular
    .module("RoRoMonApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/analytics",{
                    templateUrl:"analytics.html",
                    controller: "analyticsCtrl"
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
                .when("/graduation-rates/integrations",{
                    templateUrl:"sharedApisGraduationRates.html",
                    controller: "sharedApisGraduationRatesCtrl"
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
                })
                .when("/unemployment-rates/sharedAnalytics",{
                    templateUrl:"sharedApisUnemploymentRates.html",
                    controller: "sharedApisUnemploymentRatesCtrl"
                })
                .when("/medical-attention-rates",{
                    templateUrl:"medicalAttentionRatesList.html",
                    controller: "medicalAttentionRatesListCtrl"
                })
                .when("/medical-attention-rates/:province/:year",{
                    templateUrl:"medicalAttentionRatesEdit.html",
                    controller: "medicalAttentionRatesEditCtrl"
                })
                .when("/medical-attention-rates/analytics",{
                    templateUrl:"vistasMedicalAttentionRates.html",
                    controller: "vistasMedicalAttentionRatesCtrl"
                })
                .when("/medical-attention-rates/sharedAnalytics",{
                    templateUrl:"sharedApisMedicalAttentionRates.html",
                    controller: "sharedApisMedicalAttentionRatesCtrl"
                })
                ;
                
    });