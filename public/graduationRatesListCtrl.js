/*global angular*/
angular.module("GraduationRatesApp")
  .controller("graduationRatesListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v2/graduation-rates";
             
             $scope.addStadistic= function(){
                $http.post(api,$scope.newStadistic).then(function (response){
                    $scope.status= "Status: "+ response.status + ", Estadistica añadida";
                    getStadistics();
                },function(){
                    if($scope.newStadistic["public-school"]==null||
                    $scope.newStadistic["private-school"]==null||
                    $scope.newStadistic["charter-school"]==null||
                    $scope.newStadistic.province==null||
                    $scope.newStadistic.year==null){
                    $scope.status="Error 400: debe completar todos los campos"
                    }else{
                    $scope.status="Error 409: la estadistica ya existe"
                    }
                   
            });
               getStadistics();
        }
             $scope.deleteStadistic= function(province, year){
                console.log("Stadistic to be delete :" + province,year);
                $http.delete(api+"/"+province+"/"+year).then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getStadistics();
                });
                 getStadistics();
            }
             $scope.deleteStadistics= function(){
                console.log("all stadistic will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getStadistics();
                });
                 getStadistics();
            }
            function getStadistics(){
                $http.get(api).then(function (response){
                    $scope.stadistics = response.data;
                });
                 
            }
            
             getStadistics();
           
            
        }]);