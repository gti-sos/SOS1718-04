 /*global angular*/
angular.module("ManagerApp")
  .controller("unemploymentRatesListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v1/unemployment-rates";
             
             $scope.addUnemploymentRate= function(){
                $http.post(api,$scope.newUnemploymentRate).then(function (response){
                    $scope.status= "Status: Registro añadido con éxito";
                    getUnemploymentRates();
                },function(){
                    if($scope.length!=5){
                    $scope.status="Error: No están todos los campos rellenados"
                    }else{
                    $scope.status="Error: Ya existe la tasa de desempleo especificada"
                    }
            });
            }
             $scope.deleteUnemploymentRate = function(province, year){
                console.log("Unemployment rate to be delete :" + province,year);
                $http.delete(api+"/"+province+"/"+year).then(function (response){
                    $scope.status= "Status: Registro borrado";
                    getUnemploymentRates();
                });
                 getUnemploymentRates();
            }
            $scope.deleteUnemploymentRates = function(){
                console.log("all unemployment rates will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Status: Registros borrados";
                    getUnemploymentRates();
                });
                 getUnemploymentRates();
            }
      
             var pag=0;
             var numero;
             $scope.getUnemploymentRatesPagination=function(num){
                 numero=num;
                  
               if(num==1){
                    pag=pag-10;
                    if(pag<0){
                            pag=0;
                            $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                            $scope.unemploymentRates = response.data;
                            console.log("pagination1")
                             numero=num;
                             console.log(numero);
                             getUnemploymentRates();
                            });
                           
                    }else{
                        $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                $scope.unemploymentRates = response.data;
                  console.log("pagination2")
                   numero=num;
                    console.log(numero);
                     getUnemploymentRates();
                });
                    }
               }else{
                  
                pag=pag+10;
                $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                $scope.unemploymentRates = response.data;
                 console.log("pagination3")
                  numero=num;
                   console.log(numero);
                    getUnemploymentRates();
               });
               
                 
             }
            }
            
            $scope.fromTo= function(){
                console.log("from-to" );
                getUnemploymentRates()
          
            }
            
            function getUnemploymentRates(){
                /*$http.get(api).then(function (response){
                    $scope.unemploymentRates = response.data;
                });
                */
               console.log(numero);
               if(($scope.fromToUnemploymentRate)!=null){
                    var year1= $scope.fromToUnemploymentRate.year1;
                    var year2= $scope.fromToUnemploymentRate.year2;
                   console.log("1")
                   if($scope.fromToUnemploymentRate.year1===null && $scope.fromToUnemploymentRate.year2===null){
                       console.log("1.1")
                        $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                    $scope.stadistics = response.data;
                    $scope.status= " ";
                    pag=0;
                    
                    });
                   }else{
                       console.log("1.2")
                    
                    $http.get(api+"?from="+year1+"&to="+year2+
                            "&limit="+10+"&offset="+pag).then(function (response){
                    $scope.unemploymentRates = response.data;
                    $scope.status= "from "+$scope.fromToUnemploymentRate.year1
                            + " to "+$scope.fromToUnemploymentRate.year2 ;
                    });
                   }
                 $scope.status= "";
               }else{
                   if(numero == undefined){
                        $http.get(api+"?from="+year1+"&to="+year2+
                            "&limit="+10+"&offset="+pag).then(function (response){
                    $scope.unemploymentRates = response.data;
                   
                });
                   }
                  
               }
            }
            
            getUnemploymentRates();
            
        }]);