/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
"use strict"
angular.module("RoRoMonApp")
  .controller("graduationRatesListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v2/graduation-rates";
          
    
             $scope.addStadistic= function(){
                $http.post(api,$scope.newStadistic).then(function (response){
                    $scope.status= " Estadistica añadida";
                  getStadistics() 
                },function(){
                    if($scope.newStadistic["public-school"]==null||
                    $scope.newStadistic["private-school"]==null||
                    $scope.newStadistic["charter-school"]==null||
                    $scope.newStadistic.province==null||
                    $scope.newStadistic.year==null){
                    $scope.status="Error: debe completar todos los campos"
                    }else{
                    $scope.status="Error: la estadistica ya existe"
                    }
                getStadistics() 
            });
            
        }
             $scope.deleteStadistic= function(province, year){
                console.log("Stadistic to be delete :" + province,year);
                $http.delete(api+"/"+province+"/"+year).then(function (response){
                    $scope.status= " La estadistica ha sido eleminada";
                getStadistics()
                });
            
            }
             $scope.deleteStadistics= function(){
                console.log("all stadistic will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Todas las estadisticas han sido eliminadas";
            getStadistics()
                });
            
          
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
        
       
            
          /*   google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
      function drawRegionsMap() {
           
        var data = google.visualization.arrayToDataTable([
           
          ['Province', 'PassRate'],
          ['Huelva', parseInt(response.data.filter(d=>d.province=="huelva").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="huelva").length
                        }))],
          ['Sevilla', parseInt(response.data.filter(d=>d.province=="seville").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="seville").length
                        }))],
          ['Malaga', parseInt(response.data.filter(d=>d.province=="malaga").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="malaga").length
                                            
                        }))],
          ['Granada', parseInt(response.data.filter(d=>d.province=="granada").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="granada").length
                        }))],
          ['Almería', parseInt(response.data.filter(d=>d.province=="almeria").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="almeria").length
                        }))],
          ['Cadiz', parseInt(response.data.filter(d=>d.province=="cadiz").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="cadiz").length
                        }))],
          ['Jaen', parseInt(response.data.filter(d=>d.province=="jaen").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="jaen").length
                        }))],
          ['Cordoba', parseInt(response.data.filter(d=>d.province=="cordoba").
                        map(function(d){return (parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"]))
                                             /response.data.filter(d=>d.province=="cordoba").length
                        }))],
        ]);
        

        var options = {
            region: 'ES',
            colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
         
        displayMode: 'markers',
        colorAxis: {colors: ['red','yellow','green', 'blue']}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('stadistics2'));

        chart.draw(data, options);
      };
        */
  
                        
    
          getStadistics();
  
      
}]);

/*
      
    $http.get("/api/v2/graduation-rates").then(function(response){
       
           new Morris.Line({
  // ID of the element in which to draw the chart.
  
  element: 'stadistics3',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  
   
  data:[{year:"2014",value: parseInt(response.data.filter(d=>d.year==2014)
                                            .map(function(d){ 
                                            return parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"])
                                                /response.data.filter(d=>d.year==2014).length
                                            }
                                             
                        ))},
        {year :"2015",value: parseInt(response.data.filter(d=>d.year==2015)
                                            .map(function(d){ 
                                            return parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"])
                                                /response.data.filter(d=>d.year==2015).length
                                            }
                                             
                        ))},
        {year:"2016",value: parseInt(response.data.filter(d=>d.year==2016)
                                            .map(function(d){ 
                                            return parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"])
                                                /response.data.filter(d=>d.year==2016).length
                                            }
                                             
                        ))},
        {year:"2017",value: parseInt(response.data.filter(d=>d.year==2017)
                                            .map(function(d){ 
                                            return parseFloat(d["public-school"])+
                                            parseFloat(d["private-school"])+
                                            parseFloat(d["charter-school"])
                                                /response.data.filter(d=>d.year==2017).length
                                            }
                                             
                        ))}],
  // The name of the data record attribute that contains x-values.
  xkey: 'year',
  // A list of names of data record attributes that contain y-values.
  ykeys: ['value'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['Value']
});
      });
      
        $http.get("/api/v2/graduation-rates").then(function(response){
            
            Highcharts.chart('stadistics1', {

            title: {
                text: 'My data'
            },
        
        
            xAxis: {
                
                categories:  response.data.map(function(d){return (parseInt(d.year))})
               
            },
            yAxis: {
                title: {
                    text: 'pass rate'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: true
                    }
                }
            },
        
            series: [{
                
                name: 'PRIVATE SCHOOLS',
                data: response.data.map(function(d){return d["private-school"]})
            }, {
                name: 'PUBLIC SCHOOLS',
                data:  response.data.map(function(d){return d["public-school"]})
            }, {
                name: 'CHARTER SCHOOLS',
                data: response.data.map(function(d){return d["charter-school"]})
            }],
            
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
    });
            */
        
           
