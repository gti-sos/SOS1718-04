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

                        var myConfig = {
                            "type": "bar3d",
                            "background-color": "#fff",
                            "3d-aspect": {
                                "true3d": 0,
                                "y-angle": 10,
                                "depth": 30
                            },
                            "title": {
                                "text": "Product Sales Comparison",
                                "height": "40px",
                                "font-weight": "normal",
                                "text-color": "#ffffff"
                            },
                            "legend": {
                                "layout": "float",
                                "background-color": "none",
                                "border-color": "none",
                                "item": {
                                    "font-color": "#333"
                                },
                                "x": "37%",
                                "y": "10%",
                                "width": "90%",
                                "shadow": 0
                            },
                            "plotarea": {
                                "margin": "95px 35px 50px 70px",
                                "background-color": "#fff",
                                "alpha": 0.3
                            },
                            "scale-y": {
                                "background-color": "#fff",
                                "border-width": "1px",
                                "border-color": "#333",
                                "alpha": 0.5,
                                "format": "$%v",
                                "guide": {
                                    "line-style": "solid",
                                    "line-color": "#333",
                                    "alpha": 0.2
                                },
                                "tick": {
                                    "line-color": "#333",
                                    "alpha": 0.2
                                },
                                "item": {
                                    "font-color": "#333",
                                    "padding-right": "6px"
                                }
                            },
                            "scale-x": {
                                "background-color": "#fff",
                                "border-width": "1px",
                                "border-color": "#333",
                                "alpha": 0.5,
                                "values": ["January", "February", "March", "April", "May", "June"],
                                "guide": {
                                    "visible": false
                                },
                                "tick": {
                                    "line-color": "#333",
                                    "alpha": 0.2
                                },
                                "item": {
                                    "font-size": "11px",
                                    "font-color": "#333"
                                }
                            },
                            "series": [{
                                    "values": [22650, 18750, 29050, 28745, 31500, 31625],
                                    "text": "Product 1",
                                    "background-color": "#03A9F4 #4FC3F7",
                                    "border-color": "#03A9F4",
                                    "legend-marker": {
                                        "border-color": "#03A9F4"
                                    },
                                    "tooltip": {
                                        "background-color": "#03A9F4",
                                        "text": "$%v",
                                        "font-size": "12px",
                                        "padding": "6 12",
                                        "border-color": "none",
                                        "shadow": 0,
                                        "border-radius": 5
                                    }
                                },
                                {
                                    "values": [24200, 12750, 24250, 11500, 22550, 24250],
                                    "text": "Product 2",
                                    "background-color": "#673AB7 #9575CD",
                                    "border-color": "#673AB7",
                                    "legend-marker": {
                                        "border-color": "#673AB7"
                                    },
                                    "tooltip": {
                                        "background-color": "#673AB7",
                                        "text": "$%v",
                                        "font-size": "12px",
                                        "padding": "6 12",
                                        "border-color": "none",
                                        "shadow": 0,
                                        "border-radius": 5
                                    }
                                }
                            ]
                        };

                        zingchart.render({
                            id: 'myChart',
                            data: myConfig,
                            height: 500,
                            width: 725,
                            defaults: {
                                'font-family': 'sans-serif'
                            }
                        });




                    });
            });






    }]);
