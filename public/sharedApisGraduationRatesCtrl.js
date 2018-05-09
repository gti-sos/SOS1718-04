/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
"use strict"
angular.module("RoRoMonApp")
  .controller("sharedApisGraduationRatesCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/graduation-rates"
            var api1 = "proxyTIS/api/v1/transferincomes-stats";
            var api2 = "https://sos1718-01.herokuapp.com/api/v1/transferincomes-stats"
            
            
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
                return this.value + '°';
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
        name: 'PublicS',
       
        data: response2.data.map(function(d){return (parseInt(d["public-school"]))})

    }, {
        name: 'timaxexp',
        data: response1.data.map(function(d){return (parseInt(d.timaxexp))})
    }]
});
});
        });
        
        
        
         $http.get(api1).then(function(response1){
                $http.get(apiPropia).then(function(response2){
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
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'PublicS',
        data: response2.data.map(function(d){return (parseInt(d["public-school"]))})
    },{
        name: 'timaxexp',
        data: response1.data.map(function(d){return (parseInt(d.timaxexp))})
    }]
});
        });
        });
           
}]);