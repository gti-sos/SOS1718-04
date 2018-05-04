/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/

"use strict"
angular.module("RoRoMonApp")
  .controller("vistasUnemploymentRatesCtrl", ["$scope","$http", function($scope,$http) {
            console.log("Vistas Ctrl initialized!");
            var api = "/api/v1/unemployment-rates";

/*
 $http.get("/api/v1/unemployment-rates").then(function(response){
   google.charts.load('current', {
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
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"])+
                                            parseInt(d["min-age"])+
                                            parseInt(d["max-age"]))
                                             /response.data.filter(d=>d.province=="huelva").length
                        }))],
          ['Sevilla', parseInt(response.data.filter(d=>d.province=="sevilla").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"])+
                                            parseInt(d["min-age"])+
                                            parseInt(d["max-age"]))
                                             /response.data.filter(d=>d.province=="seville").length
                        }))],
          ['Malaga', parseInt(response.data.filter(d=>d.province=="malaga").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-gradel"])+
                                            parseFloat(d["third-degree"])+
                                            parseInt(d["min-age"])+
                                            parseInt(d["max-age"]))
                                             /response.data.filter(d=>d.province=="malaga").length
                                            
                        }))],
          ['Granada', parseInt(response.data.filter(d=>d.province=="granada").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"])+
                                            parseInt(d["min-age"])+
                                            parseInt(d["max-age"]))
                                             /response.data.filter(d=>d.province=="granada").length
                        }))],
          ['Almería', parseInt(response.data.filter(d=>d.province=="almeria").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"])+
                                            parseInt(d["min-age"])+
                                            parseInt(d["max-age"]))
                                             /response.data.filter(d=>d.province=="almeria").length
                        }))],
          ['Cadiz', parseInt(response.data.filter(d=>d.province=="cadiz").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"])+
                                            parseInt(d["min-age"])+
                                            parseInt(d["max-age"]))
                                             /response.data.filter(d=>d.province=="cadiz").length
                        }))],
          ['Jaen', parseInt(response.data.filter(d=>d.province=="jaen").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"])+
                                            parseInt(d["min-age"])+
                                            parseInt(d["max-age"]))
                                             /response.data.filter(d=>d.province=="jaen").length
                        }))],
          ['Cordoba', parseInt(response.data.filter(d=>d.province=="cordoba").
                        map(function(d){return (parseFloat(d["illiterate"])+
                                            parseFloat(d["first-grade"])+
                                            parseFloat(d["second-grade"])+
                                            parseFloat(d["third-degree"])+
                                            parseInt(d["min-age"])+
                                            parseInt(d["max-age"]))
                                             /response.data.filter(d=>d.province=="cordoba").length
                        }))],
        ]);
        

        var options = {
            region: 'ES',
        };

        var chart = new google.visualization.GeoChart(document.getElementById('stadistics2'));

        chart.draw(data, options);
      };
 });
    
      
    $http.get("/api/v2/unemployment-rates").then(function(response){
       
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
*/      
/*

Highcharts.chart('container', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Snow depth at Vikjafjellet, Norway'
    },
    subtitle: {
        text: 'Irregular time data in Highcharts JS'
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: 'Date'
        }
    },
    yAxis: {
        title: {
            text: 'Snow depth (m)'
        },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    },

    plotOptions: {
        spline: {
            marker: {
                enabled: true
            }
        }
    },

    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

    // Define the data points. All series have a dummy year
    // of 1970/71 in order to be compared on the same x axis. Note
    // that in JavaScript, months start at 0 for January, 1 for February etc.
    series: []
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