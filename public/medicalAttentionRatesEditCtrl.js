/* global angular*/
angular
    .module("MedicalAttentionRatesApp")
    .controller("medicalAttentionRatesEditCtrl", ["$scope", "$http","$routeParams", function($scope, $http, $routeParams) {
        console.log("ListCtrl initialized!");
        var URL = "/api/v1/medical-attention-rates/"+$routeParams.province+"/"+$routeParams.year;
        
        $http.get(URL).then(function (response){
            $scope.updatedMedicalAttentionRate = response.data;
        });
        
        $scope.updateMedicalAttentionRate = function (){
            $http.put(URL,$scope.updateMedicalAttentionRate).then(function (response){
                $scope.status = "Status: " + response.status;
            });
        };


    }]);
