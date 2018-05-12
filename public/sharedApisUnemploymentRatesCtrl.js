-/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
"use strict"
angular.module("RoRoMonApp")
  .controller("sharedApisUnemploymentRatesCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v1/unemployment-rates"
            var api1 = "proxySA/api/v2/students-an";
            var api2 = "https://sos1718-02.herokuapp.com/api/v2/employments/";

            $http.get(api1).then(function(response1){
                $http.get(apiPropia).then(function(response2){
                    
Highcharts.chart('sharedStadistics1', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Average Monthly Temperature and Rainfall in Tokyo'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: [{
        categories: response2.data.map(function(d){return (parseInt(d.year))}),
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Value',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Value',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name: 'Illiterate',
        type: 'column',
        yAxis: 1,
        data: response2.data.map(function(d){return parseFloat(d["illiterate"])})

    },{
        name: 'Pop Illiterate',
        type: 'spline',
        data: response1.data.map(function(d){return parseFloat(d["popilliterate"])})

    }]
});
                });
            });
        
        $http.get(api2).then(function(response1){
                $http.get(apiPropia).then(function(response2){
                var dato1 = 0.0;
                var dato2 = 0.0;
                    
Highcharts.chart('sharedStadistics2', {
    title: {
        text: 'Combination chart'
    },
    xAxis: {
        categories: response2.data.map(function(d){return (parseInt(d.year))}),
    },
    labels: {
        items: [{
            html: 'Total fruit consumption',
            style: {
                left: '50px',
                top: '18px',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
            }
        }]
    },//totalcontributingfamilyworker
    series: [{
        type: 'column',
        name: 'Illiterate',
        data: response2.data.map(function(d){dato2 = parseFloat(d["illiterate"]); return dato2})
    }, {
        type: 'column',
        name: 'totalcontributingfamilyworker',
        data: response1.data.map(function(d){dato1 = parseFloat(d["totalcontributingfamilyworker"]); return dato1;})
    }, {
        type: 'spline',
        name: 'illiterate-aux',
        data: dato1 + dato2,
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, ]
});
         });
        });
           
 }]);