/* global angular*/
angular
    .module("MedicalAttentionRatesApp")
    .controller("medicalAttentionRatesListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("ListCtrl initialized!");
        var api = "/api/v1/medical-attention-rates";

        $scope.addMedicalAttentionRate = function(){
            $http.post(api,$scope.newMedicalAttentionRate).then(function (response){
                $scope.status = response.status;
                console.log(JSON.stringify(response,null,2));
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
