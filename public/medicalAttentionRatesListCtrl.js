/* global angular*/
angular
    .module("MedicalAttentionRatesApp")
    .controller("medicalAttentionRatesListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("ListCtrl initialized!");
        var api = "/api/v1/medical-attention-rates";


        $scope.addMedicalAttentionRate = function() {
            $http.post(api, $scope.newMedicalAttentionRate).then(function successCallback(response) {
                $scope.status = "Status : " + response.status + "Dato añadido correctamente";
                getMedicalAttentionRates();
            }, function errorCallback(response) {
                console.log(response.status);
                switch (response.status) {
                    case 400:
                        $scope.status = "Status : " + response.status + "fallo al introducir datos";
                        window.alert("El dato no se ha introducido correctamente.");
                    case 409:
                        $scope.status = "Status : " + response.status + "fallo al introducir datos";
                        window.alert("El dato introducido ya existe.");
                    default:
                }


            });
            getMedicalAttentionRates()
        }



        $scope.deleteMedicalAttentionRate = function(province, year) {
            console.log("Medical Attention Rate to be deleted: " + province + year);
            $http.delete(api + "/" + province + "/" + year).then(function(response) {
                $scope.status = "Status: " + response.status;
                getMedicalAttentionRates();
            });
        }

        $scope.deleteAllMedicalAttentionRate = function() {
            console.log("Medical Attention Rate to be deleted: ");
            $http.delete(api).then(function(response) {
                $scope.status = "Status: " + response.status;
                getMedicalAttentionRates();
            });
        }

        $scope.query = function() {
            console.log("from-to" + $scope.query.year1);
            
             $http.get(api + "?from=" + $scope.query.year1 + "&to=" + $scope.query.year2 +
                    "&limit=" + 2 + "&offset=" + 0).then(function(response) {
                    $scope.medicalAttentionRates = response.data;
                });

        }


        function getMedicalAttentionRates() {
            var pag = 0;
            console.log("entro aqui" + $scope.query.year1 + $scope.query.year2);

            if ($scope.query.year1 !== undefined && $scope.query.year2 !== undefined) {

                $http.get(api + "?from=" + $scope.query.year1 + "&to=" + $scope.query.year2 +
                    "&limit=" + 2 + "&offset=" + pag).then(function(response) {
                    $scope.medicalAttentionRates = response.data;
                });
            }
            else {

                $http.get(api).then(function(response) {
                    $scope.medicalAttentionRates = response.data;
                });
            }


        }

        //getMedicalAttentionRates();
        console.log($scope.medicalAttentionRates);

    }]);
