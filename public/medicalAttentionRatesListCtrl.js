/* global angular*/
angular
    .module("MedicalAttentionRatesApp")
    .controller("medicalAttentionRatesListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("ListCtrl initialized!");
        var api = "/api/v1/medical-attention-rates";

        $scope.addMedicalAttentionRate = function(){
            $http.post(api,$scope.newMedicalAttentionRate).then(function (response){ //newMedicalAttentionRate mete en scope este objeto
                $scope.status = response.status;
                if($scope.status===201){
                        window.alert("El dato se ha introducido correctamente");
                }else{
                        window.alert("El dato no se ha introducido correctamente");
                }
                console.log(JSON.stringify(response,null,2));
                getMedicalAttentionRates();
            });
        }
        
        $scope.deleteMedicalAttentionRate = function(province,year){
            console.log("Medical Attention Rate to be deleted: "+province + year);
            $http.delete(api+"/"+province+"/"+year).then(function(response){
                $scope.status = "Status: " + response.status;
                getMedicalAttentionRates();
            });
        }
        
        $scope.deleteAllMedicalAttentionRate = function(){
            console.log("Medical Attention Rate to be deleted: ");
            $http.delete(api).then(function(response){
                $scope.status = "Status: " + response.status;
                getMedicalAttentionRates();
            });
        }
        

        function getMedicalAttentionRates() {
            $http.get(api).then(function(response) {
                $scope.medicalAttentionRates = response.data;
            });
        }

        getMedicalAttentionRates();
        console.log($scope.medicalAttentionRates);

    }]);
