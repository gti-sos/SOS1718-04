/*global angular*/
/*global Highcharts*/
/*global google*/





"use strict"
angular.module("RoRoMonApp")
  .controller("sharedApisGraduationRatesCtrl", ["$scope","$http" ,function($scope,$http) {
     
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v2/graduation-rates"
            var api1 = "proxyTIS/api/v1/transferincomes-stats";
            var api2 = "https://sos1718-05.herokuapp.com/api/v1/country-stats"
            var api3 = "https://restcountries-v1.p.mashape.com/alpha/es"

            
            
                        
            
            
             //======================================================================
          //====================================================================== 
          //==================================DE SOS====================================
           //======================================================================
            //======================================================================
            
            
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
        name: 'PublicS',
        data: response2.data.map(function(d){return (parseInt(d["public-school"]))})

    },{name: 'PrivateS',
        data: response2.data.map(function(d){return (parseInt(d["private-school"]))})

    },{name: 'CharterS',
        data: response2.data.map(function(d){return (parseInt(d["charter-school"]))})

    }, {
        name: 'timaxexp',
        data: response1.data.map(function(d){return (parseFloat(d.timaxexp))})
        
    },{
        name: 'tilessexp',
        data: response1.data.map(function(d){return (parseFloat(d.tilessexp))})

    },{
        name: 'tispa',
        data: response1.data.map(function(d){return (parseInt(d.tispa))})
        
       
    }]
});
});
        });
        
        
        //======================================================================
         //======================================================================
        
        
        
         $http.get(api2).then(function(response1){
                $http.get(apiPropia).then(function(response2){
              Highcharts.chart('sharedStadistics2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Shared stadistic2'
    },
    
    xAxis: {
        categories: response1.data.map(function(d){return (parseInt(d.year))}),
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
        name: 'rank',
        data: response1.data.map(function(d){return (parseInt(d.rank))})
    }]
});
        });
        });
        
        
        
        
        
         //======================================================================
          //====================================================================== 
          //==================================EXTERNAS====================================
           //======================================================================
            //======================================================================
        
        
        $http.get(apiPropia).then(function(response2){
        
                anychart.onDocumentReady(function () {
    // create pie chart with passed data
    var chart = anychart.pie([
        
        ['Public S',response2.data.map(function(d){return (parseFloat(d["public-school"] ))}).reduce(function (previous, current) {
        return previous + current;})/response2.data.filter(d=>d["public-school"]).length],
        ['Private S',response2.data.map(function(d){return (parseFloat(d["private-school"] ))}).reduce(function (previous, current) {
        return previous + current;})/response2.data.filter(d=>d["private-school"]).length],
        ['Charter S',response2.data.map(function(d){return (parseFloat(d["charter-school"] ))}).reduce(function (previous, current) {
        return previous + current;})/response2.data.filter(d=>d["charter-school"]).length],
        
    ]);

    // set chart title text settings
    chart.title('Media de aprobados dependiendo del tipo de colegio')
            //set chart radius
            .radius('43%')
            // create empty area in pie chart
            .innerRadius('30%');

    // set container id for the chart
    chart.container("sharedStadistics3");
    // initiate chart drawing
    chart.draw();
});
                
        });
        
        
        
         $http.get(apiPropia).then(function(response2){
             
             unirest.get("https://restcountries-v1.p.mashape.com/alpha/es")
        .header("X-Mashape-Key", "AcgEvL97rJmshaCOKvsl1gQsAywip1HIPLejsnt0pcuMEW5zzk")
        .header("Accept", "application/json")
        .end(function (result) {
          console.log(result.status, result.headers, result.body);
             
        
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
         ['year', 'media'],
         [2014, parseInt(response2.data.filter(d=>d.year==2014)
                    .map(function(d){return (parseFloat(d["private-school"]+d["public-school"]+d["charter-school"] ))}).reduce(function (previous, current) {
                    return previous + current;})/response2.data.filter(d=>d["private-school"]).length)], 
        [ 2015, parseInt(response2.data.filter(d=>d.year==2015)
                    .map(function(d){return (parseFloat(d["private-school"]+d["public-school"]+d["charter-school"] ))}).reduce(function (previous, current) {
                    return previous + current;})/response2.data.filter(d=>d["private-school"]).length)], 
        [ 2016, parseInt(response2.data.filter(d=>d.year==2016)
                    .map(function(d){return (parseFloat(d["private-school"]+d["public-school"]+d["charter-school"] ))}).reduce(function (previous, current) {
                    return previous + current;})/response2.data.filter(d=>d["private-school"]).length)],
        [ 2017, parseInt(response2.data.filter(d=>d.year==2017)
                    .map(function(d){return (parseFloat(d["private-school"]+d["public-school"]+d["charter-school"] ))}).reduce(function (previous, current) {
                    return previous + current;})/response2.data.filter(d=>d["private-school"]).length)]
            
        ]);

        var options = {
          title: 'year vs. media',
          vAxis: {title: 'media', minValue: 0, 
                                maxValue: 100},
          hAxis: {title: 'year', minValue: response2.data.map(function(d){return Math.min(parseInt(d.year ))})
                                 , maxValue: response2.data.map(function(d){return Math.max(parseInt(d.year ))})},
          legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('sharedStadistics4'));

        chart.draw(data, options);
      }
   
         
         });
         });
           
}]);