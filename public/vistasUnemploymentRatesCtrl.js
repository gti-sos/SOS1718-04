/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/

"use strict"
angular.module("ManagerApp")
  .controller("vistasUnemploymentRatesCtrl", ["$scope","$http", function($scope,$http) {
            console.log("Vistas Ctrl initialized!");
            var api = "/api/v1/unemployment-rates";
            
 $http.get("/api/v1/unemployment-rates").then(function(response){
   google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyB6jyX4JJp_esyzRPmp3qmf8qH_s-BG92E'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
      function drawRegionsMap() {
           
    var data = google.visualization.arrayToDataTable([
               
              ['Province', 'First Date'],
              ['Sevilla', parseInt(response.data.filter(d=>d.province=="sevilla").
                            map(function(d){return (parseFloat(d["first-grade"]))
                            }))],
              ['Málaga', parseInt(response.data.filter(d=>d.province=="malaga").
                            map(function(d){return (parseFloat(d["first-grade"]))
                            }))],
              ['Cádiz', parseInt(response.data.filter(d=>d.province=="cadiz").
                            map(function(d){return (parseFloat(d["first-grade"]))
                            }))],
              ['Almería', parseInt(response.data.filter(d=>d.province=="almeria").
                            map(function(d){return (parseFloat(d["first-grade"]))
                            }))],
              ['Córdoba', parseInt(response.data.filter(d=>d.province=="cordoba").
                            map(function(d){return (parseFloat(d["first-grade"]))
                            }))]
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
 });
/*
 $http.get("/api/v1/unemployment-rates").then(function(response){
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawVisualization);

      function drawVisualization() {
           
        var data = google.visualization.arrayToDataTable([
           
          ['Province', 'PassRate'],
          ['Huelva', parseInt(response.data.filter(d=>d.province=="huelva").
                        map(function(d){return (parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="huelva").length
                        }))],
          ['Sevilla', parseInt(response.data.filter(d=>d.province=="sevilla").
                        map(function(d){return (parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="sevilla").length
                        }))],
          ['Malaga', parseInt(response.data.filter(d=>d.province=="malaga").
                        map(function(d){return (parseFloat(d["first-grade"])+
                                            parseFloat(d["second-gradel"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="malaga").length
                                            
                        }))],
          ['Granada', parseInt(response.data.filter(d=>d.province=="granada").
                        map(function(d){return (parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="granada").length
                        }))],
          ['Almería', parseInt(response.data.filter(d=>d.province=="almeria").
                        map(function(d){return (parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="almeria").length
                        }))],
          ['Cadiz', parseInt(response.data.filter(d=>d.province=="cadiz").
                        map(function(d){return (parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="cadiz").length
                        }))],
          ['Jaen', parseInt(response.data.filter(d=>d.province=="jaen").
                        map(function(d){return (parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="jaen").length
                        }))],
          ['Cordoba', parseInt(response.data.filter(d=>d.province=="cordoba").
                        map(function(d){return (parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"]))
                                             /response.data.filter(d=>d.province=="cordoba").length
                        }))],
        ]);
        
    var options = {
      title : 'Unemployment Rates',
      vAxis: {title: 'Level'},
      hAxis: {title: 'Province'},
      seriesType: 'bars',
      series: {5: {type: 'line'}}
    };

    var chart = new google.visualization.ComboChart(document.getElementById('stadistics2'));
    chart.draw(data, options);
      };
 });
*/
    $http.get("/api/v1/unemployment-rates").then(function(response){
        new Dygraph(
                 
            document.getElementById("stadistics3"),  // containing div
            
            
            "Date,PassRate\n" +                // the data series
            "1981, "+parseInt(response.data.filter(d=>d.year==1981).
                        map(function(d){return (parseFloat(d['first-grade'])+
                                            parseFloat(d['second-grade'])+
                                            parseFloat(d['third-degree']))
                                             /response.data.filter(d=>d.year==1981).length
                        }))+"\n" +
            "1982, "+parseInt(response.data.filter(d=>d.year==1982).
                        map(function(d){return (parseFloat(d['first-grade'])+
                                            parseFloat(d['second-grade'])+
                                            parseFloat(d['third-degree']))
                                             /response.data.filter(d=>d.year==1982).length
                        }))+"\n"
         );
      });

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