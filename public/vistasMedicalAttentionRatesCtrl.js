/*global angular*/
/*global Highcharts*/
/*global google*/
/*global vis*/

"use strict"
angular.module("RoRoMonApp")
    .controller("vistasMedicalAttentionRatesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Vistas Ctrl initialized!");
        var api = "/api/v1/medical-attention-rates";


        $http
            .get("/api/v1/medical-attention-rates")
            .then(function(response) {


                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });

                google.charts.setOnLoadCallback(drawMarkersMap);
                /*console.log("variables :" + response.data.filter(d => d.province == "huelva" && d.year == 2016).map(d => { return d.year }));*/

                function drawMarkersMap() {
                    var data = google.visualization.arrayToDataTable([
                        ['Province', 'General Medicine' ,'year'],
                    
                        ['Seville', parseFloat(response.data.filter(d => d.province == "sevilla" && d.year == 2016).map(d => { return d['general-medicine'] })),
                            parseInt(response.data.filter(d => d.province == "sevilla" && d.year == 2016).map(d => { return d.year })),
                        ],['Cordoba', parseFloat(response.data.filter(d => d.province == "cordoba" && d.year == 2016).map(d => { return d['general-medicine'] })),
                            parseInt(response.data.filter(d => d.province == "cordoba" && d.year == 2016).map(d => { return d.year })),
                        ], ['Malaga', parseFloat(response.data.filter(d => d.province == "malaga" && d.year == 2016).map(d => { return d['general-medicine'] })),
                            parseInt(response.data.filter(d => d.province == "malaga" && d.year == 2016).map(d => { return d.year })),
                        ]
                        
                        

                    ]);

                    var options = {
                        region: 'ES',
                        displayMode: 'markers',
                        colorAxis: { colors: ['green', 'red'] }
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
                    xAxis: {
                        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Patiens for professional'

                        }
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ' patients per proffesional'
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

                            name: 'Nursing Sevilla',
                            data: response.data.filter(d => d.province === 'sevilla').map(function(d) { return d["nursing"] })
                        }, {
                            name: 'General Medicine Sevilla',
                            data: response.data.filter(d => d.province === 'sevilla').map(function(d) { return d["general-medicine"] })
                        }, {
                            name: 'Social work Sevilla',
                            data: response.data.filter(d => d.province === 'sevilla').map(function(d) { return d["social-work"] })
                        }, {
                            name: 'Nursing Cordoba',
                            data: response.data.filter(d => d.province === 'cordoba').map(function(d) { return d["nursing"] })
                        }, {
                            name: 'General Medicine Cordoba',
                            data: response.data.filter(d => d.province === 'cordoba').map(function(d) { return d["general-medicine"] })
                        }, {
                            name: 'Social work Cordoba',
                            data: response.data.filter(d => d.province === 'cordoba').map(function(d) { return d["social-work"] })
                        }, {
                            name: 'Nursing Malaga',
                            data: response.data.filter(d => d.province === 'malaga').map(function(d) { return d["nursing"] })
                        }, {
                            name: 'General Medicine Malaga',
                            data: response.data.filter(d => d.province === 'malaga').map(function(d) { return d["general-medicine"] })
                        }, {
                            name: 'Social work Malaga',
                            data: response.data.filter(d => d.province === 'malaga').map(function(d) { return d["social-work"] })
                        }, {
                            name: 'Nursing Granada',
                            data: response.data.filter(d => d.province === 'granada').map(function(d) { return d["nursing"] })
                        }, {
                            name: 'General Medicine Granada',
                            data: response.data.filter(d => d.province === 'granada').map(function(d) { return d["general-medicine"] })
                        }, {
                            name: 'Social work Granada',
                            data: response.data.filter(d => d.province === 'granada').map(function(d) { return d["social-work"] })
                        }, {
                            name: 'Nursing Jaen',
                            data: response.data.filter(d => d.province === 'jaen').map(function(d) { return d["nursing"] })
                        }, {
                            name: 'General Medicine Jaen',
                            data: response.data.filter(d => d.province === 'jaen').map(function(d) { return d["general-medicine"] })
                        }, {
                            name: 'Social work Jaen',
                            data: response.data.filter(d => d.province === 'jaen').map(function(d) { return d["social-work"] })
                        }, {
                            name: 'Nursing Huelva',
                            data: response.data.filter(d => d.province === 'huelva').map(function(d) { return d["nursing"] })
                        }, {
                            name: 'General Medicine Huelva',
                            data: response.data.filter(d => d.province === 'huelva').map(function(d) { return d["general-medicine"] })
                        }, {
                            name: 'Social work Huelva',
                            data: response.data.filter(d => d.province === 'huelva').map(function(d) { return d["social-work"] })
                        }, {
                            name: 'Nursing Cadiz',
                            data: response.data.filter(d => d.province === 'cadiz').map(function(d) { return d["nursing"] })
                        }, {
                            name: 'General Medicine Cadiz',
                            data: response.data.filter(d => d.province === 'cadiz').map(function(d) { return d["general-medicine"] })
                        }, {
                            name: 'Social work Cadiz',
                            data: response.data.filter(d => d.province === 'cadiz').map(function(d) { return d["social-work"] })
                        }, {
                            name: 'Nursing Almeria',
                            data: response.data.filter(d => d.province === 'almeria').map(function(d) { return d["nursing"] })
                        }, {
                            name: 'General Medicine Almeria',
                            data: response.data.filter(d => d.province === 'almeria').map(function(d) { return d["general-medicine"] })
                        }, {
                            name: 'Social work Almeria',
                            data: response.data.filter(d => d.province === 'almeria').map(function(d) { return d["social-work"] })
                        }






                    ]

                });


            });

        $http
            .get("/api/v1/medical-attention-rates")
            .then(function(response) {


                var container = document.getElementById('visualization');
                var items = [{
                        x: '2012-06-11',
                        y: parseInt(response.data.filter(d => d.province == "malaga" && d.year == 2012).map(function(d) {
                            return (parseFloat(d["nursing"]) +
                                    parseFloat(d["general-medicine"]) +
                                    parseFloat(d["social-work"])) /
                                response.data.filter(d => d.province == "malaga").length

                        }))
                    },
                    {
                        x: '2013-06-12',
                        y: parseInt(response.data.filter(d => d.province == "malaga" && d.year == 2013).map(function(d) {
                            return (parseFloat(d["nursing"]) +
                                    parseFloat(d["general-medicine"]) +
                                    parseFloat(d["social-work"])) /
                                response.data.filter(d => d.province == "malaga").length

                        }))
                    },
                    {
                        x: '2014-06-13',
                        y: parseInt(response.data.filter(d => d.province == "malaga" && d.year == 2014).map(function(d) {
                            return (parseFloat(d["nursing"]) +
                                    parseFloat(d["general-medicine"]) +
                                    parseFloat(d["social-work"])) /
                                response.data.filter(d => d.province == "malaga").length

                        }))
                    },
                    {
                        x: '2015-06-14',
                        y: parseInt(response.data.filter(d => d.province == "malaga" && d.year == 2015).map(function(d) {
                            return (parseFloat(d["nursing"]) +
                                    parseFloat(d["general-medicine"]) +
                                    parseFloat(d["social-work"])) /
                                response.data.filter(d => d.province == "malaga").length

                        }))
                    },
                    {
                        x: '2016-06-15',
                        y: parseInt(response.data.filter(d => d.province == "malaga" && d.year == 2016).map(function(d) {
                            return (parseFloat(d["nursing"]) +
                                    parseFloat(d["general-medicine"]) +
                                    parseFloat(d["social-work"])) /
                                response.data.filter(d => d.province == "malaga").length

                        }))
                    },
                    {
                        x: '2017-06-16',
                        y: parseInt(response.data.filter(d => d.province == "malaga" && d.year == 2017).map(function(d) {
                            return (parseFloat(d["nursing"]) +
                                    parseFloat(d["general-medicine"]) +
                                    parseFloat(d["social-work"])) /
                                response.data.filter(d => d.province == "malaga").length

                        }))
                    }
                ];

                var dataset = new vis.DataSet(items);
                var options = {
                    start: '2012-06-10',
                    end: '2017-06-18'
                };
                var graph2d = new vis.Graph2d(container, dataset, options);
            });
    }]);
