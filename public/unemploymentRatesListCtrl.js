 /*global angular*/
angular.module("RoRoMonApp")
  .controller("unemploymentRatesListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v1/unemployment-rates";
             
             $scope.addUnemploymentRate= function(){
                $http.post(api,$scope.newUnemploymentRate).then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getUnemploymentRates();
                },function(){
                    if($scope.length!=5){
                    $scope.status="Error 400: No están todos los campos rellenados"
                    }else{
                    $scope.status="Error 409: Ya existe la tasa de desempleo especificada"
                    }
            });
            }
             $scope.deleteUnemploymentRate = function(province, year){
                console.log("Unemployment rate to be delete :" + province,year);
                $http.delete(api+"/"+province+"/"+year).then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getUnemploymentRates();
                });
                 getUnemploymentRates();
            }
            $scope.deleteUnemploymentRates = function(){
                console.log("all unemployment rates will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getUnemploymentRates();
                });
                 getUnemploymentRates();
            }
      
            function getUnemploymentRates(){
                $http.get(api).then(function (response){
                    $scope.unemploymentRates = response.data;
                });
            }
           
            
            getUnemploymentRates();
            
        }]);