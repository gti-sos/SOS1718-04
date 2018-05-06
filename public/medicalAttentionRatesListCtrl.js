/* global angular*/
angular
    .module("RoRoMonApp")
    .controller("medicalAttentionRatesListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("ListCtrl initialized!");
        var api = "/api/v1/medical-attention-rates";
        var offset = 0;
        var limit = 10;

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
            if($scope.query.limit !==undefined){
                limit =$scope.query.limit;
            }

            $http.get(api + "?from=" + $scope.query.year1 + "&to=" + $scope.query.year2 +
                "&limit=" + limit + "&offset=" + offset).then(function(response) {
                $scope.medicalAttentionRates = response.data;
            });

        }

        
        function getMedicalAttentionRates() {
            
            console.log("entro aqui" + $scope.query.year1 + $scope.query.year2);

            if ($scope.query.year1 !== undefined && $scope.query.year2 !== undefined && $scope.query.limit!==undefined) {

                $http.get(api + "?from=" + $scope.query.year1 + "&to=" + $scope.query.year2 +
                    "&limit=" + $scope.query.limit + "&offset=" + offset).then(function(response) {
                    $scope.medicalAttentionRates = response.data;
                });
            }else if($scope.query.year1 !== undefined && $scope.query.year2 !== undefined){
                $http.get(api + "?from=" + $scope.query.year1 + "&to=" + $scope.query.year2 +
                    "&limit=" + limit + "&offset=" + offset).then(function(response) {
                    $scope.medicalAttentionRates = response.data;
                });
            }
            else {

                $http.get(api).then(function(response) {
                    $scope.medicalAttentionRates = response.data;
                });
            }
        }
        
        $scope.nextPagination = function() {
            console.log("next pagination");
            offset = offset + 1 ;
            getMedicalAttentionRates();
        };
        
        $scope.backPagination = function() {
            console.log("back pagination");
            offset = offset - 1 ;
            getMedicalAttentionRates();
        };
        

        getMedicalAttentionRates();
        console.log($scope.medicalAttentionRates);

    }]);
