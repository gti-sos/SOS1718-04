/*global angular*/
/*global Highcharts*/
/*global google*/
/*global vis*/

"use strict"
angular.module("RoRoMonApp")
    .controller("sharedApisMedicalAttentionRatesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Vistas Ctrl initialized!");
        var ownApi = "/api/v1/medical-attention-rates";
        var externalApi = "https://sos1718-05.herokuapp.com/api/v1/best-stats/";
        var proxy = "proxyCAC/api/v2/crimes-an";




        //=================EXTERNAS====================


        var mashapeUrban = {
            method: 'GET',
            url: "https://locationcontext-zip-info-v1.p.mashape.com/zip-info?zip=95054",
            headers: {
                "X-Mashape-Key": "CAlif50NmDmshfDYwiuiDMLhT9g3p1R5j7djsnqhrxYqNPabg2",
                "Accept": "application/json"
            }
        };

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





                                                                                console.log('ejemplo1'+response1.data.filter(d => d.province === 'sevilla' && d.year===2016 ).map(function(d) { return d["general-medicine"] })[0]);
                                                                                console.log('ejemplo2'+response1.data.filter(d => d.province === 'sevilla' && d.year===2016 )['general-medicine']);
                                                                                
                                                                                console.log(response2.data.length);
                                                                                console.log(response2.data.Results[0]);
                                                                                console.log(response2.data.Results[0]['c']);

                                                                                Highcharts.chart('sharedStadistics3', {
                                                                                    chart: {
                                                                                        type: 'line'
                                                                                    },
                                                                                    title: {
                                                                                        text: 'Latitude and general medicine for province (2015)'
                                                                                    },
                                                                                    subtitle: {
                                                                                        text: ''
                                                                                    },
                                                                                    xAxis: {
                                                                                        categories: ['Sevilla', 'Córdoba', 'Malaga', 'Almería', 'Jaén', 'Huelva', 'Cádiz', 'Granada']
                                                                                    },
                                                                                    yAxis: {
                                                                                        title: {
                                                                                            text: 'Latitude '
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
                                                                                        name: 'General Medicine',
                                                                                        data: [response1.data.filter(d => d.province === 'sevilla' && d.year===2016 ).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'cordoba' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'jaen' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'almeria' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'cadiz' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'granada' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'huelva' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0],
                                                                                            response1.data.filter(d => d.province === 'malaga' && d.year === 2016).map(function(d) { return d["general-medicine"] })[0]
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



    }]);
