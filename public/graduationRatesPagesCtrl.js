/*global angular*/
angular.module("GraduationRatesApp")
  .controller("graduationRatesPagesCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v2/graduation-rates";
             
             $scope.addStadistic= function(){
                $http.post(api,$scope.newStadistic).then(function (response){
                    $scope.status= "Status: "+ response.status + ", Estadistica añadida";
                  
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
            getStadisticsPagination()
        }
             $scope.deleteStadistic= function(province, year){
                console.log("Stadistic to be delete :" + province,year);
                $http.delete(api+"/"+province+"/"+year).then(function (response){
                    $scope.status= "Status: "+ response.status +", La estadistica ha sido eleminada";
                    getStadisticsPagination()
                });
            
            }
             $scope.deleteStadistics= function(){
                console.log("all stadistic will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Status: "+ response.status +", Todas las estadisticas han sido eliminadas";
                    getStadisticsPagination()
                });
          
            }
            
           
                            
                function getStadistics(){
                $http.get(api).then(function (response){
                $scope.stadistics = response.data;
                });
                         getStadisticsPagination()        
            }
        
            
           getStadisticsPagination()
           
           function getStadisticsPagination(){
              
                $http.get(api+"?limit="+10+"&offset="+page).then(function (response){
                $scope.stadistics = response.data;
               
            var i;
            var count =0;
           $scope.pag=[];
            for(i=0;i< (response.data).length;i++){
            console.log(i)
                if(i%10==0){
                    $scope.pag.push(count);
                    count =  count + 1
               
                }
            }
            
            console.log(count)
            console.log($scope.pag)
            
        });
                
    }
            
           
}]);