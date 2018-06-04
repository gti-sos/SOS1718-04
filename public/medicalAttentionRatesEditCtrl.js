/* global angular*/
angular
    .module("ManagerApp")
    .controller("medicalAttentionRatesEditCtrl", ["$scope", "$http","$routeParams","$location", function($scope, $http, $routeParams,$location) {
        console.log("EditCtrl initialized!");
        var URL = "/api/v1/medical-attention-rates/"+$routeParams.province+"/"+$routeParams.year;
        
        $http.get(URL).then(function (response){
            $scope.updatedMedicalAttentionRate = response.data;
        });
        
        
        $scope.updateMedicalAttentionRate = function() {
            $http.put(URL, $scope.updatedMedicalAttentionRate).then(function(response) {
                $scope.status = "Status: " + response.status;
                //console.log(Object.keys($scope.updatedMedicalAttentionRate).length)
                window.alert("OK: estadistica actualizada");
                $location.path("/medical-attention-rates");
            }, function() {
                if ($scope.updatedMedicalAttentionRate["nursing"] == null ||
                    $scope.updatedMedicalAttentionRate["social-work"] == null ||
                    $scope.updatedMedicalAttentionRate["general-medicine"] == null) {
                    $scope.status = "Error: debe completar todos los campos"
                }
            });
        }


    }]);
