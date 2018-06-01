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
            url: "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php?location=New+York",
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
            $http(mashapeUrban)
            .then(function(proxyResponse) {
                $http
                    .get(ownApi)
                    .then(function(response1) {

                        console.log("Ejemplo 1:"+proxyResponse.data[0][0]);
                        console.log("Ejemeplo 2:"+proxyResponse.data[0][0]['type']);
                        console.log("Ejemplo 3:"+proxyResponse.data.filter(d => d.type === 'city'));


                       


                    });

            });

            
            


    }]);
