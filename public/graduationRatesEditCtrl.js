/*global angular*/
angular.module("ManagerApp")
    .controller("graduationRatesEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Ctrl initialized!");
        var stadisticUrl = "/api/v2/graduation-rates/" + $routeParams.province + "/" + $routeParams.year;
        $http.get(stadisticUrl).then(function(response) {
            
            $scope.updatedStadistic = response.data;
        });
        $scope.updateStadistic = function() {
            $http.put(stadisticUrl, $scope.updatedStadistic).then(function(response) {
                $scope.status = "Status: " + response.status;
                console.log(Object.keys($scope.updatedStadistic).length)
                window.alert("OK: estadistica actualizada");
                $location.path("/graduation-rates");
            }, function() {
                if ($scope.updatedStadistic["public-school"] == null ||
                    $scope.updatedStadistic["private-school"] == null ||
                    $scope.updatedStadistic["charter-school"] == null) {
                    $scope.status = "Error: debe completar todos los campos"
                }
            });
        }
    }]);
