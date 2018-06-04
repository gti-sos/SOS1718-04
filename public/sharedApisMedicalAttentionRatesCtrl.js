/*global angular*/
/*global Highcharts*/
/*global google*/
/*global vis*/
/*global google*/
/*global zingchart*/

"use strict"
angular.module("RoRoMonApp")
    .controller("sharedApisMedicalAttentionRatesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Vistas Ctrl initialized!");
        var ownApi = "/api/v1/medical-attention-rates";
        var externalApi = "https://sos1718-05.herokuapp.com/api/v1/best-stats/";
        var proxy = "proxyCAC/api/v2/crimes-an";




        //=================EXTERNAS====================

        var mashapeLocation2 = {
            method: 'GET',
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=Sevilla",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };
        var mashapeLocation3 = {
            method: 'GET',
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=Cordoba",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };
        var mashapeLocation4 = {
            method: 'GET',
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=Jaen",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };
        var mashapeLocation5 = {
            method: 'GET',
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=Granada",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };
        var mashapeLocation6 = {
            method: 'GET',
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=Huelva",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };
        var mashapeLocation7 = {
            method: 'GET',
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=Almeria",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };
        var mashapeLocation8 = {
            method: 'GET',
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=Cadiz",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };
        var mashapeLocation9 = {
            method: 'GET',
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=Malaga",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };



        var mashapeNutritionix = {
            method: 'GET',
            url: "https://nutritionix-api.p.mashape.com/v1_1/search/cheddar%20cheese?fields=nf_calories",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };




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
                                type: 'column',
                                options3d: {
                                    enabled: true,
                                    alpha: 15,
                                    beta: 15,
                                    viewDistance: 25,
                                    depth: 40
                                }
                            },

                            title: {
                                text: 'Medical Attention rates and the most selling song in the year in Seville (Spain)'
                            },

                            xAxis: {
                                categories: [auxResponse.data.filter(d => d.country === 'Spain' && d.year === 2013).map(function(d) { return d["song"] })[0], auxResponse.data.filter(d => d.country === 'Spain' && d.year === 2014).map(function(d) { return d["song"] })[0], auxResponse.data.filter(d => d.country === 'Spain' && d.year === 2015).map(function(d) { return d["song"] })[0], auxResponse.data.filter(d => d.country === 'Spain' && d.year === 2016).map(function(d) { return d["song"] })[0]],
                                labels: {
                                    skew3d: true,
                                    style: {
                                        fontSize: '16px'
                                    }
                                }
                            },

                            yAxis: {
                                allowDecimals: false,
                                min: 0,
                                title: {
                                    text: 'Patients per proffesional',
                                    skew3d: true
                                }
                            },

                            tooltip: {
                                headerFormat: '<b>{point.key}</b><br>',
                                pointFormat: '<span style="color:{series.color}">●</span> {series.name}: {point.y} / {point.stackTotal}'
                            },

                            plotOptions: {
                                column: {
                                    stacking: 'normal',
                                    depth: 40
                                }
                            },

                            series: [{
                                name: 'General Medicine',
                                data: response.data.filter(d => d.province === 'sevilla' && d.year < 2017 && d.year > 2012).sort((a, b) => a.year - b.year).map(function(d) { return d["general-medicine"] }),

                            }, {
                                name: 'Nursing',
                                data: response.data.filter(d => d.province === 'sevilla' && d.year < 2017 && d.year > 2012).sort((a, b) => a.year - b.year).map(function(d) { return d["nursing"] }),

                            }, {
                                name: 'Social Work',
                                data: response.data.filter(d => d.province === 'sevilla' && d.year < 2017 && d.year > 2012).sort((a, b) => a.year - b.year).map(function(d) { return d["social-work"] }),

                            }]
                        });

                    });
            });


        //External API

        $http
            .get(ownApi)
            .then(function(response1) {
                $http(mashapeLocation2)
                    .then(function(response2) {
                        $http(mashapeLocation3)
                            .then(function(response3) {
                                $http(mashapeLocation4)
                                    .then(function(response4) {
                                        $http(mashapeLocation5)
                                            .then(function(response5) {
                                                $http(mashapeLocation6)
                                                    .then(function(response6) {
                                                        $http(mashapeLocation7)
                                                            .then(function(response7) {
                                                                $http(mashapeLocation8)
                                                                    .then(function(response8) {
                                                                        $http(mashapeLocation9)
                                                                            .then(function(response9) {


                                                                                Highcharts.chart('sharedStadistics3', {
                                                                                    chart: {
                                                                                        type: 'line'
                                                                                    },
                                                                                    title: {
                                                                                        text: 'Latitude and general medicine in andalucia in 2016'
                                                                                    },
                                                                                    subtitle: {
                                                                                        text: ''
                                                                                    },
                                                                                    xAxis: {
                                                                                        categories: ['sevilla', 'cordoba', 'jaen', 'granada', 'huelva', 'almeria', 'cadiz', 'malaga']
                                                                                    },
                                                                                    yAxis: {
                                                                                        title: {
                                                                                            text: 'Temperature (°C)'
                                                                                        }
                                                                                    },
                                                                                    plotOptions: {
                                                                                        line: {
                                                                                            dataLabels: {
                                                                                                enabled: true
                                                                                            },
                                                                                            enableMouseTracking: false
                                                                                        }
                                                                                    },
                                                                                    series: [{
                                                                                        name: 'General medicine',
                                                                                        data: [response1.data.filter(d => d.province === 'sevilla' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'cordoba' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'jaen' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'granada' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'huelva' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'almeria' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'cadiz' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'malaga' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0]
                                                                                        ]
                                                                                    }, {
                                                                                        name: 'Latitude',
                                                                                        data: [parseFloat(response2.data.Results[0]['lat']), parseFloat(response3.data.Results[5]['lat']), parseFloat(response4.data.Results[5]['lat']),
                                                                                            parseFloat(response5.data.Results[0]['lat']), parseFloat(response6.data.Results[0]['lat']), parseFloat(response7.data.Results[1]['lat']),
                                                                                            parseFloat(response8.data.Results[0]['lat']), parseFloat(response9.data.Results[10]['lat'])
                                                                                        ]
                                                                                    }]
                                                                                });
                                                                            });
                                                                    });
                                                            });
                                                    });
                                            });
                                    });

                            });
                    });
            });

        $http(mashapeNutritionix)
            .then(function(response2) {
                $http
                    .get(ownApi)
                    .then(function(response1) {
                        console.log(response2.data['hits'][0]['fields']['nf_calories']);

                        Highcharts.chart('container', {

                            chart: {
                                type: 'boxplot'
                            },

                            title: {
                                text: 'Calories & 2016 medical attention rates'
                            },

                            legend: {
                                enabled: false
                            },

                            xAxis: {
                                categories: ['Calories', 'sevilla', 'cordoba', 'malaga', 'cadiz'],
                                title: {
                                    text: ''
                                }
                            },

                            yAxis: {
                                title: {
                                    text: 'Observations'
                                },
                                plotLines: [{
                                    value: 932,
                                    color: 'red',
                                    width: 1,
                                    label: {
                                        text: 'Theoretical mean: 932',
                                        align: 'center',
                                        style: {
                                            color: 'gray'
                                        }
                                    }
                                }]
                            },

                            series: [{
                                name: 'Observations',
                                data: [
                                    [response2.data['hits'][0]['fields']['nf_calories'], response2.data['hits'][1]['fields']['nf_calories'],
                                        response2.data['hits'][2]['fields']['nf_calories'], response2.data['hits'][3]['fields']['nf_calories'], response2.data['hits'][4]['fields']['nf_calories']
                                    ],

                                    [response1.data.filter(d => d.province === 'sevilla' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'sevilla' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'sevilla' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'sevilla' && d.year === 2016).map(function(d) { return d["social-work"] })[0],
                                        response1.data.filter(d => d.province === 'sevilla' && d.year === 2016).map(function(d) { return d["nursing"] })[0]
                                    ],


                                    [response1.data.filter(d => d.province === 'cordoba' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'cordoba' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'cordoba' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'cordoba' && d.year === 2016).map(function(d) { return d["social-work"] })[0],
                                        response1.data.filter(d => d.province === 'cordoba' && d.year === 2016).map(function(d) { return d["nursing"] })[0]
                                    ],

                                    [response1.data.filter(d => d.province === 'malaga' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'malaga' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'malaga' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'malaga' && d.year === 2016).map(function(d) { return d["social-work"] })[0],
                                        response1.data.filter(d => d.province === 'malaga' && d.year === 2016).map(function(d) { return d["nursing"] })[0]
                                    ],

                                    [response1.data.filter(d => d.province === 'cadiz' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'cadiz' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'cadiz' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                        response1.data.filter(d => d.province === 'cadiz' && d.year === 2016).map(function(d) { return d["social-work"] })[0],
                                        response1.data.filter(d => d.province === 'cadiz' && d.year === 2016).map(function(d) { return d["nursing"] })[0]
                                    ],

                                ],
                                tooltip: {
                                    headerFormat: '<em>Experiment No {point.key}</em><br/>'
                                }
                            }, {
                                name: 'Outlier',
                                color: Highcharts.getOptions().colors[0],
                                type: 'scatter',
                                data: [ // x, y positions where 0 is the first category
                                    [0, 644],
                                    [4, 718],
                                    [4, 951],
                                    [4, 969]
                                ],
                                marker: {
                                    fillColor: 'white',
                                    lineWidth: 1,
                                    lineColor: Highcharts.getOptions().colors[0]
                                },
                                tooltip: {
                                    pointFormat: 'Observation: {point.y}'
                                }
                            }]

                        });



                    });
            });

        $http
            .get(ownApi)
            .then(function(response1) {
                $http(mashapeLocation2)
                    .then(function(response2) {
                        $http(mashapeLocation3)
                            .then(function(response3) {
                                $http(mashapeLocation4)
                                    .then(function(response4) {
                                        $http(mashapeLocation5)
                                            .then(function(response5) {
                                                $http(mashapeLocation6)
                                                    .then(function(response6) {
                                                        $http(mashapeLocation7)
                                                            .then(function(response7) {
                                                                $http(mashapeLocation8)
                                                                    .then(function(response8) {
                                                                        $http(mashapeLocation9)
                                                                            .then(function(response9) {


                                                                                function drawChart() {
                                                                                    var data = new google.visualization.DataTable();
                                                                                    data.addColumn('string', 'Province');
                                                                                    data.addColumn('string', 'Latitude');
                                                                                    data.addColumn('string', 'ToolTip');

                                                                                    // For each orgchart box, provide the name, manager, and tooltip to show.
                                                                                    data.addRows([
                                                                                        [{ v: String(response1.data.filter(d => d.province === 'sevilla' && d.year === 2016).map(function(d) { return d["province"] })[0]), f: 'sevilla<div style="color:red; font-style:italic">Capital</div>' },
                                                                                            '', 'Capital'
                                                                                        ],
                                                                                        [{ v: String(response1.data.filter(d => d.province === 'cordoba' && d.year === 2016).map(function(d) { return d["province"] })[0]), f: 'Jim<div style="color:red; font-style:italic">provincia</div>' },
                                                                                                'sevilla', 'VP'
                                                                                        ],
                                                                                        [String(response1.data.filter(d => d.province === 'malaga' && d.year === 2016).map(function(d) { return d["province"] })[0]), 'malaga', ''],
                                                                                        ['Bob', 'sevilla', 'Bob Sponge'],
                                                                                        ['Carol', 'sevilla', '']
                                                                                    ]);

                                                                                    // Create the chart.
                                                                                    var chart = new google.visualization.OrgChart(document.getElementById('sharedStadistics5'));
                                                                                    // Draw the chart, setting the allowHtml option to true for the tooltips.
                                                                                    chart.draw(data, { allowHtml: true });
                                                                                }
                                                                            });
                                                                    });
                                                            });
                                                    });
                                            });
                                    });

                            });
                    });
            });






    }]);
