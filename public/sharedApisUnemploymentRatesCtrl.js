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
/*
            $http.get(api1).then(function(response1){
                $http.get(apiPropia).then(function(response2){
              Highcharts.chart('sharedStadistics1', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Mixed Stats1'
    },
    
    xAxis: {
        categories: response2.data.map(function(d){return (parseInt(d.year))})
    },
    yAxis: {
        title: {
            text: 'Mixed Stats'
        },
        labels: {
            formatter: function () {
                return this.value ;
            }
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: 'Illiterate',
        data: response2.data.map(function(d){return parseFloat(d["illiterate"])})

    },{name: 'First grade',
        data: response2.data.map(function(d){return parseFloat(d["first-grade"])})

    },{name: 'Second grade',
        data: response2.data.map(function(d){return parseFloat(d["second-grade"])})
        
    }, {
        name: 'Third degree',
        data: response2.data.map(function(d){return parseFloat(d["third-degree"])})
        
    },{
        name: 'Pop Illiterate',
        data: response1.data.map(function(d){return parseFloat(d["popilliterate"])})

    },{
        name: 'Pop High Education',
        data: response1.data.map(function(d){return parseFloat(d["pophigheducation"])})
        
       
    },{
        name: 'Pop In University',
        data: response1.data.map(function(d){return parseFloat(d["popinuniversity"])})
        
       
    }]
});
});
        });

*/
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
        data: response2.data.map(function(d){return parseFloat(d["illiterate"])})
    }, {
        type: 'column',
        name: 'totalcontributingfamilyworker',
        data: response1.data.map(function(d){return parseFloat(d["totalcontributingfamilyworker"])})
    }, {
        type: 'spline',
        name: 'illiterate-aux',
        data: response2.data.map(function(d){return parseFloat(d["illiterate"])}),
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }, ]
});

                    /*
              Highcharts.chart('sharedStadistics2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Shared stadistic2'
    },
    
    xAxis: {
        categories: response2.data.map(function(d){return (parseInt(d.year))}),
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
           
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x:40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
/*
    {
        name: 'Illiterate',
        type: 'column',
        yAxis: 1,
        data: response2.data.map(function(d){return parseFloat(d["illiterate"])})

    }

    series: [{
        name: 'Illiterate',
        data: response2.data.map(function(d){return parseFloat(d["illiterate"])})
    },{
        name: 'Illiterate',
         data: response2.data.map(function(d){return parseFloat(d["illiterate"])})
     }]
 });
 */
         });
        });
           
 }]);