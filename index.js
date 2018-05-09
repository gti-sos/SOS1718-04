var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var path = require("path");
//var cors =require("cors");
//var request = require('request');

//comentario
//Importamos nuestras APIs:
var unemploymentRates = require("./unemployment-rates");
var graduationRates = require("./graduation-rates");
var medicalAttentionRates = require("./medical-attention-rates");

var apiServerHost = 'https://sos1718-01.herokuapp.com';

var port = (process.env.PORT || 1607);
var port1 = 1608;
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH2 = "/api/v2";

//URL de las bases de datos:
var mdbURLUnemploymentRates = "mongodb://crirompov:crirompov-password-10@ds221339.mlab.com:21339/crirompov-unemployment-rates";
var mdbURLGraduationRates = "mongodb://rgfandres:dcDBsosBA@ds251435.mlab.com:51435/andresrgf-graduation-rates";
var mdbURLMedicalAttentionRates = "mongodb://carmontap:sos1718@ds129939.mlab.com:29939/carmontap-medical-attention-rates";
// var dbFileName = __dirname+"/unemployment-rates.db";


var app = express();
//app.use(cors());


app.use(bodyParser.json());


app.use("/", express.static(path.join(__dirname + "/public")));

var initialUnemploymentRates = [{
        "province": "sevilla",
        "year": 1981,
        "illiterate": 3.7,
        "first-grade": 5.1,
        "second-grade": 24.9,
        "third-degree": 0.1,
        "min-age": 16,
        "max-age": 19
    },
    {
        "province": "malaga",
        "year": 1981,
        "illiterate": 2.5,
        "first-grade": 3.0,
        "second-grade": 16.9,
        "third-degree": 0.1,
        "min-age": 16,
        "max-age": 19
    },
    {
        "province": "cadiz",
        "year": 1981,
        "illiterate": 2.7,
        "first-grade": 4.3,
        "second-grade": 13.4,
        "third-degree": 0.0,
        "min-age": 16,
        "max-age": 19
    },
    {
        "province": "almeria",
        "year": 1981,
        "illiterate": 0.5,
        "first-grade": 0.8,
        "second-grade": 3.3,
        "third-degree": 0,
        "min-age": 16,
        "max-age": 19
    },
    {
        "province": "cordoba",
        "year": 1981,
        "illiterate": 1.7,
        "first-grade": 2.7,
        "second-grade": 11.9,
        "third-degree": 0,
        "min-age": 16,
        "max-age": 19
    },
];

var initialGraduationRates = [{
        "province": "almeria",
        "year": 2014,
        "public-school": 60.8,
        "private-school": 92.7,
        "charter-school": 78.0
    },{
        "province": "huelva",
        "year": 2015,
        "public-school": 79.4,
        "private-school": 100.0,
        "charter-school": 83.9
    },
    {
        "province": "seville",
        "year": 2015,
        "public-school": 80.9,
        "private-school": 98.2,
        "charter-school": 89.5
    },
    {
        "province": "cadiz",
        "year": 2016,
        "public-school": 78.1,
        "private-school": 96.4,
        "charter-school": 87.7
    },
    {
        "province": "malaga",
        "year": 2016,
        "public-school": 83.77,
        "private-school": 92.74,
        "charter-school": 91.04
    },
    {
        "province": "granada",
        "year": 2016,
        "public-school": 83.8,
        "private-school": 92.7,
        "charter-school": 91.0
    },{
        "province": "jaen",
        "year": 2017,
        "public-school": 70.8,
        "private-school": 88.7,
        "charter-school": 81.0
    },
    {
        "province": "cordoba",
        "year": 2017,
        "public-school": 71.8,
        "private-school": 90.7,
        "charter-school": 83.0
    }
];

var initialMedicalAttentionRates = [{
        "province": "sevilla",
        "year": 2016,
        "general-medicine": 35.23,
        "nursing": 19.7,
        "social-work": 5.07,
    },
    {
        "province": "malaga",
        "year": 2016,
        "general-medicine": 34.2,
        "nursing": 1.2,
        "social-work": 2.1,
    },
    {
        "province": "granada",
        "year": 2016,
        "general-medicine": 3.4,
        "nursing": 2.3,
        "social-work": 2.8,
    },
    {
        "province": "cordoba",
        "year": 2016,
        "general-medicine": 1.2,
        "nursing": 1.7,
        "social-work": 3.9,
    },
    {
        "province": "jaen",
        "year": 2016,
        "general-medicine": 2.6,
        "nursing": 2.8,
        "social-work": 1.9,
    },
];

//PROXYS----------


app.use("/proxyTIS", function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


//PROXYS----------



MongoClient.connect(mdbURLMedicalAttentionRates, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB(carmontap)" + err);
        process.exit(1);
    }
    console.log("Connected to DB(carmontap)");

    var database = mlabs.db("carmontap-medical-attention-rates");
    var db = database.collection("medicalAttentionRates"); //nombre de la colección en mongodb


var initialMedicalAttentionRates = [{
        "province": "sevilla",
        "year": 2016,
        "general-medicine": 35.23,
        "nursing": 19.7,
        "social-work": 5.07,
    },
    {
        "province": "malaga",
        "year": 2016,
        "general-medicine": 34.2,
        "nursing": 1.2,
        "social-work": 2.1,
    },
    {
        "province": "granada",
        "year": 2016,
        "general-medicine": 3.4,
        "nursing": 2.3,
        "social-work": 2.8,
    },
    {
        "province": "cordoba",
        "year": 2016,
        "general-medicine": 1.2,
        "nursing": 1.7,
        "social-work": 3.9,
    },
    {
        "province": "jaen",
        "year": 2016,
        "general-medicine": 2.6,
        "nursing": 2.8,
        "social-work": 1.9,
    },
];

MongoClient.connect(mdbURLMedicalAttentionRates, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB(carmontap)" + err);
        process.exit(1);
    }
    console.log("Connected to DB(carmontap)");

    var database = mlabs.db("carmontap-medical-attention-rates");
    var db = database.collection("medicalAttentionRates"); //nombre de la colección en mongodb


    //Métodos loadInitialData:
    app.get(BASE_API_PATH + "/medical-attention-rates/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /medical-attention-rates/loadInitialData");
        db.find({}).toArray((errs, medicalAttentionRates) => {
            if (errs) {
                console.error("Error accesing to datas: " + errs);
            }
            if (medicalAttentionRates.length == 0) {
                console.log(Date() + " - GET /medical-attention-rates/loadInitialData - Empty DB");
                var initialMedicalAttentionRates = [{
                        "province": "sevilla",
                        "year": 2016,
                        "general-medicine": 35.23,
                        "nursing": 19.7,
                        "social-work": 5.07,
                    },
                    {
                        "province": "malaga",
                        "year": 2016,
                        "general-medicine": 34.2,
                        "nursing": 1.2,
                        "social-work": 2.1,
                    },
                    {
                        "province": "granada",
                        "year": 2016,
                        "general-medicine": 3.4,
                        "nursing": 2.3,
                        "social-work": 2.8,
                    },
                    {
                        "province": "cordoba",
                        "year": 2016,
                        "general-medicine": 1.2,
                        "nursing": 1.7,
                        "social-work": 3.9,
                    },
                    {
                        "province": "jaen",
                        "year": 2016,
                        "general-medicine": 2.6,
                        "nursing": 2.8,
                        "social-work": 1.9,
                    },
                ];
                db.insert(initialMedicalAttentionRates);
                console.log(Date() + " - GET /medical-attention-rates/loadInitialData - Created " + medicalAttentionRates.length + " medical attention rates");
            }
            else {
                console.log(Date() + " - GET /medical-attention-rates/loadInitialData - DB has " + medicalAttentionRates.length + " medical attention rates");
            }
        });
        res.sendStatus(200);
    });



    db.find({}).toArray((err, medicalAttentionRates) => { //Esto devuelve el query como un array de objetos

        if (err) {
            console.error("Error accesing DB(carmontap)");
            process.exit(1);
        }
        if (medicalAttentionRates.length == 0) {
            console.log("Empty DB");
            db.insert(initialMedicalAttentionRates);
        }
        else {
            console.log("DB has " + medicalAttentionRates.length + " medical Attention According To Type Rates (carmontap)");
        }
    });

    medicalAttentionRates.register(app, db);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });

});

    //Métodos loadInitialData:
    app.get(BASE_API_PATH + "/medical-attention-rates/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /medical-attention-rates/loadInitialData");
        db.find({}).toArray((errs, medicalAttentionRates) => {
            if (errs) {
                console.error("Error accesing to datas: " + errs);
            }
            if (medicalAttentionRates.length == 0) {
                console.log(Date() + " - GET /medical-attention-rates/loadInitialData - Empty DB");
                var initialMedicalAttentionRates = [{
                        "province": "sevilla",
                        "year": 2016,
                        "general-medicine": 35.23,
                        "nursing": 19.7,
                        "social-work": 5.07,
                    },
                    {
                        "province": "malaga",
                        "year": 2016,
                        "general-medicine": 34.2,
                        "nursing": 1.2,
                        "social-work": 2.1,
                    },
                    {
                        "province": "granada",
                        "year": 2016,
                        "general-medicine": 3.4,
                        "nursing": 2.3,
                        "social-work": 2.8,
                    },
                    {
                        "province": "cordoba",
                        "year": 2016,
                        "general-medicine": 1.2,
                        "nursing": 1.7,
                        "social-work": 3.9,
                    },
                    {
                        "province": "jaen",
                        "year": 2016,
                        "general-medicine": 2.6,
                        "nursing": 2.8,
                        "social-work": 1.9,
                    },
                ];
                db.insert(initialMedicalAttentionRates);
                console.log(Date() + " - GET /medical-attention-rates/loadInitialData - Created " + medicalAttentionRates.length + " medical attention rates");
            }
            else {
                console.log(Date() + " - GET /medical-attention-rates/loadInitialData - DB has " + medicalAttentionRates.length + " medical attention rates");
            }
        });
        res.sendStatus(200);
    });



    db.find({}).toArray((err, medicalAttentionRates) => { //Esto devuelve el query como un array de objetos

        if (err) {
            console.error("Error accesing DB(carmontap)");
            process.exit(1);
        }
        if (medicalAttentionRates.length == 0) {
            console.log("Empty DB");
            db.insert(initialMedicalAttentionRates);
        }
        else {
            console.log("DB has " + medicalAttentionRates.length + " medical Attention According To Type Rates (carmontap)");
        }
    });

    medicalAttentionRates.register(app, db);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });

});


MongoClient.connect(mdbURLUnemploymentRates, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB: " + err);
        process.exit(1);
    }
    console.log("Connected to db in mlabs");

    var database = mlabs.db("crirompov-unemployment-rates");
    var db = database.collection("unemployment-rates");

    db.find({}).toArray((errs, unemploymentRatesAux) => {
        if (errs) {
            console.error("Error accesing to datas: " + errs);
            //process.exit(1);
        }
        if (unemploymentRatesAux.length == 0) {
            console.log("Empty DB");
            db.insert(initialUnemploymentRates);
        }
        else {
            console.log("DB has " + unemploymentRatesAux.length + " unemployment rates");
        }
    });

    //Métodos loadInitialData:
    app.get(BASE_API_PATH + "/unemployment-rates/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /unemployment-rates/loadInitialData");
        db.find({}).toArray((errs, unemploymentRatesAux) => {
            if (errs) {
                console.error("Error accesing to datas: " + errs);
                //process.exit(1);
            }
            if (unemploymentRatesAux.length == 0) {
                console.log(Date() + " - GET /unemployment-rates/loadInitialData - Empty DB");
                var initialUnemploymentRates = [{
                        "province": "sevilla",
                        "year": 1981,
                        "illiterate": 3.7,
                        "first-grade": 5.1,
                        "second-grade": 24.9,
                        "third-degree": 0.1,
                        "min-age": 16,
                        "max-age": 19
                    },
                    {
                        "province": "malaga",
                        "year": 1981,
                        "illiterate": 2.5,
                        "first-grade": 3.0,
                        "second-grade": 16.9,
                        "third-degree": 0.1,
                        "min-age": 16,
                        "max-age": 19
                    },
                    {
                        "province": "cadiz",
                        "year": 1981,
                        "illiterate": 2.7,
                        "first-grade": 4.3,
                        "second-grade": 13.4,
                        "third-degree": 0.0,
                        "min-age": 16,
                        "max-age": 19
                    },
                    {
                        "province": "almeria",
                        "year": 1981,
                        "illiterate": 0.5,
                        "first-grade": 0.8,
                        "second-grade": 3.3,
                        "third-degree": 0,
                        "min-age": 16,
                        "max-age": 19
                    },
                    {
                        "province": "cordoba",
                        "year": 1981,
                        "illiterate": 1.7,
                        "first-grade": 2.7,
                        "second-grade": 11.9,
                        "third-degree": 0,
                        "min-age": 16,
                        "max-age": 19
                    },
                ];
                db.insert(initialUnemploymentRates);
                console.log(Date() + " - GET /unemployment-rates/loadInitialData - Created " + unemploymentRatesAux.length + " unemployment rates");
            }
            else {
                console.log(Date() + " - GET /unemployment-rates/loadInitialData - DB has " + unemploymentRatesAux.length + " unemployment rates");
            }
        });
        res.sendStatus(200);
    });

    unemploymentRates.register(app, db);
    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
});





MongoClient.connect(mdbURLGraduationRates, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB: " + err);
        process.exit(1);
    }
    console.log("Connected to dbGraduation in mlabs");

    var database = mlabs.db("andresrgf-graduation-rates");
    var dbGraduation = database.collection("graduation-rates");

    dbGraduation.find({}).toArray((errs, graduationRatesAux) => {
        if (errs) {
            console.error("Error accesing to datas: " + errs);
            //process.exit(1);
        }
        if (graduationRatesAux.length == 0) {
            console.log("Empty DB");
            dbGraduation.insert(initialGraduationRates);
        }
        else {
            console.log("DB has " + graduationRatesAux.length + " graduation rates");
        }
    });

    //Métodos loadInitialData:
    app.get(BASE_API_PATH2 + "/graduation-rates/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /graduation-rates/loadInitialData");
        dbGraduation.find({}).toArray((errs, graduationRatesAux) => {
            if (errs) {
                console.error("Error accesing to datas: " + errs);
            }
            if (graduationRatesAux.length == 0) {
                console.log(Date() + " - GET /graduation-rates/loadInitialData - Empty DB");
                var initialGraduationRates = [{
        "province": "almeria",
        "year": 2014,
        "public-school": 60.8,
        "private-school": 92.7,
        "charter-school": 78.0
    },{
        "province": "huelva",
        "year": 2015,
        "public-school": 79.4,
        "private-school": 100.0,
        "charter-school": 83.9
    },
    {
        "province": "seville",
        "year": 2015,
        "public-school": 80.9,
        "private-school": 98.2,
        "charter-school": 89.5
    },
    {
        "province": "cadiz",
        "year": 2016,
        "public-school": 78.1,
        "private-school": 96.4,
        "charter-school": 87.7
    },
    {
        "province": "malaga",
        "year": 2016,
        "public-school": 83.77,
        "private-school": 92.74,
        "charter-school": 91.04
    },
    {
        "province": "granada",
        "year": 2016,
        "public-school": 83.8,
        "private-school": 92.7,
        "charter-school": 91.0
    },{
        "province": "jaen",
        "year": 2017,
        "public-school": 70.8,
        "private-school": 88.7,
        "charter-school": 81.0
    },
    {
        "province": "cordoba",
        "year": 2017,
        "public-school": 71.8,
        "private-school": 90.7,
        "charter-school": 83.0
    }
                ];
                dbGraduation.insert(initialGraduationRates);
                console.log(Date() + " - GET /graduation-rates/loadInitialData - Created " + graduationRatesAux.length + " graduation rates");
            }
            else {
                console.log(Date() + " - GET /graduation-rates/loadInitialData - DB has " + graduationRatesAux.length + " graduation rates");
            }
        });
        res.sendStatus(200);
    });

    graduationRates.register(app, dbGraduation);
    app.listen(port1, () => {
        console.log("Server ready on port " + port1 + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
});
