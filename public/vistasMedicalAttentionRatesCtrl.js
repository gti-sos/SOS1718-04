/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/

"use strict"
angular.module("RoRoMonApp")
    .controller("vistasMedicalAttentionRatesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Vistas Ctrl initialized!");
        var api = "/api/v1/medical-attention-rates";


        $http.get("/api/v1/medical-attention-rates").then(function(response) {
            google.charts.load('current', {
                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyDAjDUgpV0cP7Qnwd39t0LvahG2UMJPkKo'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            function drawRegionsMap() {

                var data = google.visualization.arrayToDataTable([

                    ['Province', 'PassRate'],
                    ['Huelva', parseInt(response.data.filter(d => d.province == "huelva").map(function(d) {
                        return (parseFloat(d["nursing"]) +
                                parseFloat(d["general-medicine"]) +
                                parseFloat(d["social-work"])) /
                            response.data.filter(d => d.province == "huelva").length
                    }))],
                    ['Sevilla', parseInt(response.data.filter(d => d.province == "seville").map(function(d) {
                        return (parseFloat(d["nursing"]) +
                                parseFloat(d["general-medicine"]) +
                                parseFloat(d["social-work"])) /
                            response.data.filter(d => d.province == "seville").length
                    }))],
                    ['Malaga', parseInt(response.data.filter(d => d.province == "malaga").map(function(d) {
                        return (parseFloat(d["nursing"]) +
                                parseFloat(d["general-medicine"]) +
                                parseFloat(d["social-work"])) /
                            response.data.filter(d => d.province == "malaga").length

                    }))],
                    ['Granada', parseInt(response.data.filter(d => d.province == "granada").map(function(d) {
                        return (parseFloat(d["nursing"]) +
                                parseFloat(d["general-medicine"]) +
                                parseFloat(d["social-work"])) /
                            response.data.filter(d => d.province == "granada").length
                    }))],
                    ['Almería', parseInt(response.data.filter(d => d.province == "almeria").map(function(d) {
                        return (parseFloat(d["nursing"]) +
                                parseFloat(d["general-medicine"]) +
                                parseFloat(d["social-work"])) /
                            response.data.filter(d => d.province == "almeria").length
                    }))],
                    ['Cadiz', parseInt(response.data.filter(d => d.province == "cadiz").map(function(d) {
                        return (parseFloat(d["nursing"]) +
                                parseFloat(d["general-medicine"]) +
                                parseFloat(d["social-work"])) /
                            response.data.filter(d => d.province == "cadiz").length
                    }))],
                    ['Jaen', parseInt(response.data.filter(d => d.province == "jaen").map(function(d) {
                        return (parseFloat(d["nursing"]) +
                                parseFloat(d["general-medicine"]) +
                                parseFloat(d["social-work"])) /
                            response.data.filter(d => d.province == "jaen").length
                    }))],
                    ['Cordoba', parseInt(response.data.filter(d => d.province == "cordoba").map(function(d) {
                        return (parseFloat(d["nursing"]) +
                                parseFloat(d["general-medicine"]) +
                                parseFloat(d["social-work"])) /
                            response.data.filter(d => d.province == "cordoba").length
                    }))],
                ]);


                var options = {
                    region: 'ES',
                    colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },

                    displayMode: 'markers',
                    colorAxis: { colors: ['red', 'yellow', 'green', 'blue'] }
                };

                var chart = new google.visualization.GeoChart(document.getElementById('stadistics2'));

                chart.draw(data, options);
            };
        });

        /*
        $http.get("/api/v2/graduation-rates").then(function(response){
            
            Highcharts.chart('stadistics1', {

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
                series: {
                    label: {
                        connectorAllowed: true
                    }
                }
            },
        
            series: [{
                
                name: 'PRIVATE SCHOOLS',
                data: response.data.map(function(d){return d["private-school"]})
            }, {
                name: 'PUBLIC SCHOOLS',
                data:  response.data.map(function(d){return d["public-school"]})
            }, {
                name: 'CHARTER SCHOOLS',
                data: response.data.map(function(d){return d["charter-school"]})
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
           */
           
        $http
            .get("/api/v1/medical-attention-rates")
            .then(function (response){
                
                
                
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
            xAxis: {
                categories: ['2000', '2005', '2010', '2015', '2020'],
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
                data: response.data.map(function(d){return d["nursing"]})
            }, {
                name: 'General Medicine',
                data:  response.data.map(function(d){return d["general-medicine"]})
            }, {
                name: 'Social work',
                data: response.data.map(function(d){return d["social-work"]})
            }]
            
        });
                
                
            });


        


    }]);
