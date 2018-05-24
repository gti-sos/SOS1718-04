/*global angular*/
/*global Highcharts*/
"use strict"
angular.module("RoRoMonApp")
  .controller("analyticsCtrl", ["$scope","$http", function($scope,$http) {
            console.log("Analytics Ctrl initialized!");
            
            var api1 = "/api/v2/graduation-rates";
               var api2 = "api/v1/medical-attention-rates";
                  var api3 = "api/v1/unemployment-rates";


 $http.get(api1).then(function(response1){
      $http.get(api2).then(function(response2){
           $http.get(api3).then(function(response3){
     
   
            Highcharts.chart("sharedStadisticsGroup04", {

            title: {
                text: 'My data'
            },
        
        
            xAxis: {
                
                categories:  response2.data.map(function(d){return (parseInt(d.year))})
               
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
                data: response1.data.map(function(d){return d["private-school"]})
            }, {
                name: 'PUBLIC SCHOOLS',
                data:  response1.data.map(function(d){return d["public-school"]})
            }, {
                name: 'CHARTER SCHOOLS',
                data: response1.data.map(function(d){return d["charter-school"]})
            },{
                name: 'illiterate',
                data: response3.data.map(function(d){return d.illiterate})
            },{
                name: 'First Grade',
                data: response3.data.map(function(d){return d["first-grade"]})
            },{
                name: 'Second Grade',
                data: response3.data.map(function(d){return d["second-grade"]})
            },{
                name: 'GENERAL MEDICINE',
                data: response2.data.map(function(d){return d["general-medicine"]})
            },{
                name: 'NURSING',
                data: response2.data.map(function(d){return d.nursing})
            },{
                name: 'SOCIAL WORK',
                data: response2.data.map(function(d){return d["social-work"]})
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
      });
 });
            
}]);