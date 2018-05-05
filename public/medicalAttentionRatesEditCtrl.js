/* global angular*/
angular
    .module("MedicalAttentionRatesApp")
    .controller("medicalAttentionRatesEditCtrl", ["$scope", "$http","$routeParams","$location", function($scope, $http, $routeParams,$location) {
        console.log("EditCtrl initialized!");
        var URL = "/api/v1/medical-attention-rates/"+$routeParams.province+"/"+$routeParams.year;
        
        $http.get(URL).then(function (response){
            $scope.updatedMedicalAttentionRate = response.data;
        });
        /*
        $scope.updateMedicalAttentionRate = function (){
            $http.put(URL,$scope.updatedMedicalAttentionRate).then(function (response){
                $scope.status = "Status: " + response.status;
                $location.path("/");
            });
        };
        */
        /*
        $scope.updateMedicalAttentionRate = function() {
            $http.put(URL,$scope.updatedMedicalAttentionRate).then(function successCallback(response){
                $scope.status = "Status : " + response.status + "Dato añadido correctamente";
                $location.path("/");
            }, function errorCallback(response) {
                console.log(response.status);
                if(response.status ===400){
                    $scope.status = "Status : " + response.status + "fallo al introducir datos";
                    window.alert("El dato no se ha introducido correctamente." +$scope.updatedMedicalAttentionRate );
                }
            });
        };
        */
        
        $scope.updateMedicalAttentionRate = function() {
            $http.put(URL, $scope.updatedMedicalAttentionRate).then(function(response) {
                $scope.status = "Status: " + response.status;
                //console.log(Object.keys($scope.updatedMedicalAttentionRate).length)
                window.alert("OK: estadistica actualizada");
                $location.path("/");
            }, function() {
                if ($scope.updatedMedicalAttentionRate["nursing"] == null ||
                    $scope.updatedMedicalAttentionRate["social-work"] == null ||
                    $scope.updatedMedicalAttentionRate["general-medicine"] == null) {
                    $scope.status = "Error: debe completar todos los campos"
                }
            });
        }


    }]);
