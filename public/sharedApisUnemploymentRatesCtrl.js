-/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
"use strict"
angular.module("RoRoMonApp")
  .controller("sharedApisUnemploymentRatesCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            
            var apiPropia = "/api/v1/unemployment-rates"
            
            //=================SOS====================
            var api1 = "proxySA/api/v2/students-an";
            var api2 = "https://sos1718-02.herokuapp.com/api/v2/employments/";
            
            //=================EXTERNAS====================
            var api3 = "";
            var api4 = "";
            
            var mashapeDeezerEminem = {
                method: 'GET',
                url: "https://deezerdevs-deezer.p.mashape.com/artist/eminem",
                headers: {
                    "X-Mashape-Key": "N7bg9PaaAimshjzm9hlUU98PgkPEp1934AZjsnKWYN62SRGMor", 
                    "Accept": "application/json"
                }
            };
            

//========================== APIS SOS

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
    },//totalself
    series: [{
        type: 'column',
        name: 'Illiterate',
        data: response2.data.map(function(d){return parseFloat(d["illiterate"])})
    }, {
        type: 'column',
        name: 'totalcontributingfamilyworker',
        data: response1.data.map(function(d){return parseFloat(d["totalcontributingfamilyworker"])})
    }, {
        type: 'spline',
        name: 'Total Self',
        data: response1.data.map(function(d){return parseFloat(d["totalself"])}),
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, {
        type: 'spline',
        name: 'First Grade',
        data: response2.data.map(function(d){return parseFloat(d["first-grade"])}),
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, ]
});
         });
        });
           

//========================== APIS SOS
        $http.get(apiPropia).then(function(response1){
                $http(mashapeDeezerEminem).then(function(response2){
                    console.log("data: "+response2.data);
            anychart.onDocumentReady(function() {
              var data = [{
                  x: 'Eminem',
                  value: response2.data.map(function(d){return parseInt(d["nb_album"])})
                },
                {
                  x: 'Sevilla',
                  value: response1.data.map(function(d){return parseFloat(d["illiterate"])}).reduce(function (previous, current) { return (previous + current);})
                }
              ];
            
              // create barmekko chart with data
              var chart = anychart.barmekko(data);
              // set chart title text settings
              chart.title('Canciones de Eminem vs Illerate de Sevilla');
            
              // set chart padding
              chart.padding().left(75);
            
              // enabled labels
              chart.labels(true);
            
              // set tooltip settings
              chart.tooltip().format('Requests: {%Value}');
            
              // get average
              var average = Math.round(chart.getSeries(0).getStat('average'));
            
              // create line marker
              chart.lineMarker()
                .zIndex(100)
                .value(average)
                .stroke('#F44336', 2)
                .axis(chart.yAxis());
            
              // create text marker
              chart.textMarker()
                .value(average)
                .text('Average ' + average)
                .anchor('right-center')
                .offsetX(10)
                .align('left')
                .zIndex(100)
                .axis(chart.yAxis());
            
              // set container id for the chart
              chart.container('sharedStadistics3');
              // initiate chart drawing
              chart.draw();
            });
         });
        });

 }]);
 