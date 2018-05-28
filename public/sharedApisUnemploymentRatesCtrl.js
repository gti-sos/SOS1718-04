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
            
            var mashapeInsult = {
                method: 'GET',
                url: "https://lakerolmaker-insult-generator-v1.p.mashape.com/?mode=random",
                headers: {
                    "X-Mashape-Key": "N7bg9PaaAimshjzm9hlUU98PgkPEp1934AZjsnKWYN62SRGMor", 
                    "Accept": "application/json"
                }
            };
            

//========================== APIS SOS

            $http.get(api1).then(function(response1){
                $http.get(apiPropia).then(function(response2){
/*                    
                    // Give the points a 3D feel by adding a radial gradient
Highcharts.setOptions({
    colors: $.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.4,
                cy: 0.3,
                r: 0.5
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
            ]
        };
    })
});

// Set up the chart
var chart = new Highcharts.Chart({
    chart: {
        renderTo: 'sharedStadistics1',
        margin: 100,
        type: 'scatter3d',
        animation: false,
        options3d: {
            enabled: true,
            alpha: 10,
            beta: 30,
            depth: 250,
            viewDistance: 5,
            fitToPlot: false,
            frame: {
                bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                side: { size: 1, color: 'rgba(0,0,0,0.06)' }
            }
        }
    },
    title: {
        text: 'Illiterate VS Pop Illiterate'
    },
    subtitle: {
        text: 'Click and drag the plot area to rotate in space'
    },
    plotOptions: {
        scatter: {
            width: 10,
            height: 10,
            depth: 10
        }
    },
    yAxis: {
        min: 0,
        max: 10,
        title: null
    },
    xAxis: {
        min: 0,
        max: 10,
        gridLineWidth: 1
    },
    zAxis: {
        min: 0,
        max: 10,
        showFirstLabel: false
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Illiterate',
        colorByPoint: true,
        data: [response2.data.map(function(d){return parseFloat(d["illiterate"])})]

    },{
        name: 'Pop Illiterate',
        colorByPoint: true,
        data: [response1.data.map(function(d){return parseFloat(d["popilliterate"])})]

    }]
});


// Add mouse and touch events for rotation
(function (H) {
    function dragStart(eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.chartX,
            posY = eStart.chartY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            sensitivity = 5; // lower is more sensitive

        function drag(e) {
            // Get e.chartX and e.chartY
            e = chart.pointer.normalize(e);

            chart.update({
                chart: {
                    options3d: {
                        alpha: alpha + (e.chartY - posY) / sensitivity,
                        beta: beta + (posX - e.chartX) / sensitivity
                    }
                }
            }, undefined, undefined, false);
        }

        chart.unbindDragMouse = H.addEvent(document, 'mousemove', drag);
        chart.unbindDragTouch = H.addEvent(document, 'touchmove', drag);

        H.addEvent(document, 'mouseup', chart.unbindDragMouse);
        H.addEvent(document, 'touchend', chart.unbindDragTouch);
    }
    H.addEvent(chart.container, 'mousedown', dragStart);
    H.addEvent(chart.container, 'touchstart', dragStart);
}(Highcharts));
*/
     google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable([
        ['Name', 'Value'],
        ['Illiterate', response2.data.map(function(d){return parseFloat(d["illiterate"])})],
        ['Pop Illiterate', response1.data.map(function(d){return parseFloat(d["popilliterate"])})]
      ]);
    
      var options = {
        title: 'Relación entre Illiterate' +
               'Y Pop Illiterate',
        hAxis: {title: 'Value'},
        vAxis: {title: 'Year'},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('sharedStadistics1'));
      chart.draw(data, options);
    }

                    ////////**********
/*
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
*/
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
           

//========================== APIS externa SOS
        $http.get(apiPropia).then(function(response1){
                $http(mashapeDeezerEminem).then(function(response2){
            anychart.onDocumentReady(function() {
              var data = [{
                  x: 'Eminem',
                  value: response2.data["nb_album"]
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
        
    $http.get(apiPropia).then(function(response1){
        $http(mashapeInsult).then(function(response2){
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
    
          function drawChart() {
    
            var data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['First grade',     response1.data.map(function(d){return parseFloat(d["illiterate"])}).reduce(function (previous, current) { return (previous + current);})],
              ['Insultos',      response2.data.length]
            ]);
    
            var options = {
              title: 'Cantidad first grade Sevilla Vs Longitud de los insultos'
            };
    
            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    
            chart.draw(data, options);
          }

        });
    });
 }]);
 
 