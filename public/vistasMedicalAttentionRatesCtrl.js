/*global angular*/
/*global Highcharts*/
/*global google*/
/*global uv*/

"use strict"
angular.module("RoRoMonApp")
    .controller("vistasMedicalAttentionRatesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Vistas Ctrl initialized!");
        var api = "/api/v1/medical-attention-rates";


        $http
            .get("/api/v1/medical-attention-rates")
            .then(function(response){
                
                
                google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        
        google.charts.setOnLoadCallback(drawMarkersMap);
        console.log("variables :"+ response.data.filter(d=>d.province=="huelva" && d.year==2016).map(d => {return d.year}));
        
        function drawMarkersMap() {
            var data = google.visualization.arrayToDataTable([
                ['Province', 'Year', 'Nursing'],
                ['Huelva', parseInt(response.data.filter(d=>d.province=="huelva" && d.year==2016).map(d => {return d.year})),
                parseFloat(response.data.filter(d=>d.province=="huelva" && d.year==2016).map(d => {return d.nursing}))],
                ['Sevilla', parseInt(response.data.filter(d=>d.province=="sevilla" && d.year==2016).map(d => {return d.year})),
                parseFloat(response.data.filter(d=>d.province=="sevilla" && d.year==2016).map(d => {return d.nursing}))],
                ['Cordoba', parseInt(response.data.filter(d=>d.province=="cordoba" && d.year==2016).map(d => {return d.year})),
                parseFloat(response.data.filter(d=>d.province=="cordoba" && d.year==2016).map(d => {return d.nursing}))],
                ['Jaen', parseInt(response.data.filter(d=>d.province=="jaen" && d.year==2016).map(d => {return d.year})),
                parseFloat(response.data.filter(d=>d.province=="jaen" && d.year==2016).map(d => {return d.nursing}))],
                ['Almeria', parseInt(response.data.filter(d=>d.province=="almeria" && d.year==2016).map(d => {return d.year})),
                parseFloat(response.data.filter(d=>d.province=="almeria" && d.year==2016).map(d => {return d.nursing}))],
                ['Malaga', parseInt(response.data.filter(d=>d.province=="malaga" && d.year==2016).map(d => {return d.year})),
                parseFloat(response.data.filter(d=>d.province=="malaga" && d.year==2016).map(d => {return d.nursing}))],
                ['Granada', parseInt(response.data.filter(d=>d.province=="granada" && d.year==2016).map(d => {return d.year})),
                parseFloat(response.data.filter(d=>d.province=="granada" && d.year==2016).map(d => {return d.nursing}))],
                ['Cadiz', parseInt(response.data.filter(d=>d.province=="cadiz" && d.year==2016).map(d => {return d.year})),
                parseFloat(response.data.filter(d=>d.province=="cadiz" && d.year==2016).map(d => {return d.nursing}))],
            ]);

            var options = {
                region: 'ES',
                displayMode: 'markers',
                colorAxis: { colors: ['green', 'blue'] }
            };

            var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        };
                
                
                
                
                
                
                
                
                
                
            });
            
        

    

        $http
            .get("/api/v1/medical-attention-rates")
            .then(function(response) {



                Highcharts.chart('medicalAttentionRates2', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'Medical attention rates'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {categories: ['2000', '2005', '2010', '2015', '2020'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Billions'

                        }
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ' millions'
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#666666',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#666666'
                            }
                        }
                    },

                    series: [{

                        name: 'Nursing',
                        data: response.data.map(function(d) { return d["nursing"] })
                    }, {
                        name: 'General Medicine',
                        data: response.data.map(function(d) { return d["general-medicine"] })
                    }, {
                        name: 'Social work',
                        data: response.data.map(function(d) { return d["social-work"] })
                    }]

                });


            });


    }]);
