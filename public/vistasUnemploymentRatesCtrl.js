/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/

"use strict"
angular.module("RoRoMonApp")
  .controller("vistasUnemploymentRatesCtrl", ["$scope","$http", function($scope,$http) {
            console.log("Vistas Ctrl initialized!");
            var api = "/api/v1/unemployment-rates";

 $http.get("/api/v1/unemployment-rates").then(function(response){
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawVisualization);

      function drawVisualization() {
           
        var data = google.visualization.arrayToDataTable([
           
          ['Province', 'PassRate'],
          ['Huelva', parseInt(response.data.filter(d=>d.province=="huelva").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="huelva").length
                        }))],
          ['Sevilla', parseInt(response.data.filter(d=>d.province=="sevilla").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="seville").length
                        }))],
          ['Malaga', parseInt(response.data.filter(d=>d.province=="malaga").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-gradel"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="malaga").length
                                            
                        }))],
          ['Granada', parseInt(response.data.filter(d=>d.province=="granada").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="granada").length
                        }))],
          ['Almería', parseInt(response.data.filter(d=>d.province=="almeria").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="almeria").length
                        }))],
          ['Cadiz', parseInt(response.data.filter(d=>d.province=="cadiz").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="cadiz").length
                        }))],
          ['Jaen', parseInt(response.data.filter(d=>d.province=="jaen").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="jaen").length
                        }))],
          ['Cordoba', parseInt(response.data.filter(d=>d.province=="cordoba").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="cordoba").length
                        }))],
        ]);
        
    var options = {
      title : 'Unemployment Rates',
      vAxis: {title: 'Cups'},
      hAxis: {title: 'Month'},
      seriesType: 'bars',
      series: {5: {type: 'line'}}
    };

    var chart = new google.visualization.ComboChart(document.getElementById('stadistics2'));
    chart.draw(data, options);
      };
 });

 /*     
    $http.get("/api/v1/unemployment-rates").then(function(response){
       
           new Morris.Line({
  // ID of the element in which to draw the chart.
  
  element: 'stadistics3',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.

  data:[{year:"1981",value: parseInt(response.data.filter(d=>d.year==1981)
                                            .map(function(d){ 
                                            return parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["thid-degree"])
                                                /response.data.filter(d=>d.year==2014).length
                                            }
                                             
                        ))},
        {year :"1982",value: parseInt(response.data.filter(d=>d.year==1982)
                                            .map(function(d){ 
                                            return parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["thid-degree"])
                                                /response.data.filter(d=>d.year==2015).length
                                            }
                                             
                        ))},
        {year:"1983",value: parseInt(response.data.filter(d=>d.year==1983)
                                            .map(function(d){ 
                                            return parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["thid-degree"])
                                                /response.data.filter(d=>d.year==2016).length
                                            }
                                             
                        ))},
        {year:"1984",value: parseInt(response.data.filter(d=>d.year==1984)
                                            .map(function(d){ 
                                            return parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["thid-degree"])
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
   */     
        $http.get("/api/v1/unemployment-rates").then(function(response){
            
            Highcharts.chart('stadistics1', {
            chart: {
                type: 'spline'
            },
    
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
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: [{
                
                name: 'ILLITERATE',
                data: response.data.map(function(d){return d["illiterate"]})
            },{
                
                name: 'FIRST GRADE',
                data: response.data.map(function(d){return d["first-grade"]})
            }, {
                name: 'SECOND GRADE',
                data:  response.data.map(function(d){return d["second-grade"]})
            }, {
                name: 'THIRD DEGREE',
                data: response.data.map(function(d){return d["third-degree"]})
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
     
}]);