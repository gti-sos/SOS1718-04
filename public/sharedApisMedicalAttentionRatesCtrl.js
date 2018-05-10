/*global angular*/
/*global Highcharts*/
/*global google*/
/*global vis*/

"use strict"
angular.module("RoRoMonApp")
    .controller("sharedApisMedicalAttentionRatesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Vistas Ctrl initialized!");
        var ownApi = "/api/v1/medical-attention-rates";
        var externalApi = "https://sos1718-12.herokuapp.com/api/v2/rape-stats";
        var proxy = "proxyCAC/api/v2/crimes-an";

        $http
            .get(proxy)
            .then(function(proxyResponse) {
                $http
                    .get(ownApi)
                    .then(function(response1) {



                        //console.log("crimenes los datos;" + proxyResponse.data.filter(d => d.province === 'sevilla' && d.year < 2017 && d.year > 2011).sort((a, b) => a.year - b.year).map(function(d) { return d["onecrime"] }));

                        Highcharts.chart('sharedStadistics1', {
                            chart: {
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'Crimes vs Social Work Rates (In Seville)'
                            },
                            xAxis: [{
                                categories: ['2012', '2013', '2014', '2015', '2016', '2017', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                            }],
                            yAxis: [{ // Primary yAxis
                                labels: {
                                    format: '{value} Crimes',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                },
                                title: {
                                    text: 'crimes',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                }
                            }, { // Secondary yAxis
                                title: {
                                    text: '',
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },
                                labels: {
                                    format: '{value} patiens for professional',
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },
                                opposite: true
                            }],

                            tooltip: {
                                shared: true
                            },

                            series: [{
                                name: 'Crimes',
                                type: 'column',
                                yAxis: 1,
                                data: proxyResponse.data.filter(d => d.province === 'sevilla' && d.year < 2017 && d.year > 2011).sort((a, b) => a.year - b.year).map(function(d) { return d["onecrime"] }),
                                tooltip: {
                                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} crimes</b> '
                                }
                            }, {
                                name: 'Social Work Rate',
                                type: 'spline',
                                data: response1.data.filter(d => d.province === 'sevilla').sort((a, b) => a.year - b.year).map(function(d) { return d["social-work"] }),
                                tooltip: {
                                    pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} patients </b> '
                                }

                            }]
                        });



                    });

            });

        //Esperando que tenga cors
        $http
            .get(externalApi)
            .then(function(auxResponse) {
                $http
                    .get(ownApi)
                    .then(function(response) {
                        Highcharts.chart('sharedStadistics2', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Efficiency Optimization by Branch'
                            },
                            xAxis: {
                                categories: [
                                    'Seattle HQ',
                                    'San Francisco',
                                    'Tokyo'
                                ]
                            },
                            yAxis: [{
                                min: 0,
                                title: {
                                    text: 'Employees'
                                }
                            }, {
                                title: {
                                    text: 'Profit (millions)'
                                },
                                opposite: true
                            }],
                            legend: {
                                shadow: false
                            },
                            tooltip: {
                                shared: true
                            },
                            plotOptions: {
                                column: {
                                    grouping: false,
                                    shadow: false,
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                name: 'Employees',
                                color: 'rgba(165,170,217,1)',
                                data: [150, 73, 20],
                                pointPadding: 0.3,
                                pointPlacement: -0.2
                            }, {
                                name: 'Employees Optimized',
                                color: 'rgba(126,86,134,.9)',
                                data: [140, 90, 40],
                                pointPadding: 0.4,
                                pointPlacement: -0.2
                            }, {
                                name: 'Profit',
                                color: 'rgba(248,161,63,1)',
                                data: [183.6, 178.8, 198.5],
                                tooltip: {
                                    valuePrefix: '$',
                                    valueSuffix: ' M'
                                },
                                pointPadding: 0.3,
                                pointPlacement: 0.2,
                                yAxis: 1
                            }, {
                                name: 'Profit Optimized',
                                color: 'rgba(186,60,61,.9)',
                                data: [203.6, 198.8, 208.5],
                                tooltip: {
                                    valuePrefix: '$',
                                    valueSuffix: ' M'
                                },
                                pointPadding: 0.4,
                                pointPlacement: 0.2,
                                yAxis: 1
                            }]
                        });




                    });
            });


    }]);
