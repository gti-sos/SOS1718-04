/*global angular*/
angular.module("GraduationRatesApp")
  .controller("graduationRatesListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v2/graduation-rates";
             
             $scope.addStadistic= function(){
                $http.post(api,$scope.newStadistic).then(function (response){
                    $scope.status= " Estadistica añadida";
                  
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
            getStadistics()
        }
             $scope.deleteStadistic= function(province, year){
                console.log("Stadistic to be delete :" + province,year);
                $http.delete(api+"/"+province+"/"+year).then(function (response){
                    $scope.status= " La estadistica ha sido eleminada";
                });
             getStadistics()
            }
             $scope.deleteStadistics= function(){
                console.log("all stadistic will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Todas las estadisticas han sido eliminadas";
                   
                });
            getStadistics()
          
            }
             $scope.fromTo= function(){
                console.log("from-to" );
                /*$http.get(api+"?from="+$scope.fromToStadistic.year1+"&to="+$scope.fromToStadistic.year2)
                    .then(function (response){
                   
                });*/
                getStadistics()
          
            }
             var pag=0;
             var numero;
             $scope.getStadisticsPagination=function(num){
                 numero=num;
                  
               if(num==1){
                    pag=pag-10;
                    if(pag<0){
                            pag=0;
                            $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                            $scope.stadistics = response.data;
                            console.log("pagination1")
                             numero=num;
                             console.log(numero);
                             getStadistics();
                            });
                           
                    }else{
                        $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                $scope.stadistics = response.data;
                  console.log("pagination2")
                   numero=num;
                    console.log(numero);
                     getStadistics();
                });
                    }
               }else{
                  
                pag=pag+10;
                $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                $scope.stadistics = response.data;
                 console.log("pagination3")
                  numero=num;
                   console.log(numero);
                    getStadistics();
               });
               
                 
             }
            }
               
           /* var i;
            var count =0;
           $scope.pag=[];
            for(i=0;i< (response.data).length;i++){
            console.log(i)
                if(i%10==0){
                    $scope.pag.push(count);
                    count =  count + 1
                }
            }*/
        
       getStadistics()
        
         
            function getStadistics(){
               console.log(numero);
           if(($scope.fromToStadistic)!=null){
                var year1= $scope.fromToStadistic.year1;
                var year2= $scope.fromToStadistic.year2;
               console.log("1")
               if($scope.fromToStadistic.year1===null && $scope.fromToStadistic.year2===null){
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
                $scope.stadistics = response.data;
                $scope.status= "from "+$scope.fromToStadistic.year1
                        + " to "+$scope.fromToStadistic.year2 ;
                });
               }
             $scope.status= "";
           }else{
               if(numero == undefined){
                    $http.get(api+"?from="+year1+"&to="+year2+
                        "&limit="+10+"&offset="+pag).then(function (response){
                $scope.stadistics = response.data;
            });
               }
              
           }
          
        }
                        
    
         
    
            
           
}]);