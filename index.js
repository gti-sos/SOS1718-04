var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var path = require("path");

//Importamos nuestras APIs:
var unemploymentRates = require("./unemployment-rates");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

//URL de las bases de datos:
var mdbURLUnemploymentRates = "mongodb://crirompov:crirompov-password-10@ds221339.mlab.com:21339/crirompov-unemployment-rates";


// var dbFileName = __dirname+"/unemployment-rates.db";


var app = express();

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
/*
app.get(BASE_API_PATH + "/unemployment-rates/help", (res, req) => {
    return res.redirect('https://documenter.getpostman.com/view/3896692/sos1718-04-unemployment-rates-v1/RVnZgdXZ');
});
//################### Inicio API REST de Andrés:

var initialGraduationRates = [{
        "province": "huelva",
        "year": 2015,
        "public school": 79.4,
        "private school": 100.0,
        "charter school": 83.9
    },
    {
        "province": "seville",
        "year": 2015,
        "public school": 80.9,
        "private school": 98.2,
        "charter school": 89.5
    }
];

// Descomentar en caso de hacer persistencia
// var db = new DataStore({
//     filename: dbFileName,
//     autoload: true
// });

// db.find({},(err,graduationRates)=>{
//     if(err){
//         console.error(" Error accesing DB");
//         process.exit(1);
//     }

//     if(graduationRates.length == 0){
//         console.log("Empty DB");
//         db.insert(initualGraduationRates);
//     }else{
//         console.log("DB initialized with "+graduationRates.length+" graduation-rates");
//     }

// });


app.get(BASE_API_PATH + "/graduation-rates/loadInitialData", (req, res) => {
    console.log(Date() + " - GET /graduation-rates/loadInitialData");
 if (initialGraduationRates.length == 0) {
        initialGraduationRates = [
            {
                "province": "huelva",
                "year": 2015,
                "public school": 79.4,
                "private school": 100.0,
                "charter school": 83.9
            },
            {
                "province": "seville",
                "year": 2015,
                "public school": 80.9,
                "private school": 98.2,
                "charter school": 89.5
            }

        ];
    }
    //Inicializamos los datos en caso de necesitarlo
    // db.find({},(err,gruaduationRates)=>{
    //     if(err){
    //         console.error(" Error accesing DB");
    //         process.exit(1);
    //     }

    //     if(graduationRates.length == 0){
    //         console.log("Empty DB");
    //         db.insert(initialGraduationRates);
    //     }else{
    //         console.log("DB initialized with "+graduationRates.length+" graduation-ates");
    //     }

    // });
    res.sendStatus(200);
});

app.get(BASE_API_PATH + "/graduation-rates", (req, res) => {
    console.log(Date() + " - GET /graduation-rates");
    //     db.find({},(err,graduationRates)=>{
    //      if(err){
    //          console.error(" Error accesing DB");
    //          res.sendStatus(500);
    //          return;
    //     }
    //     res.send(graduationRates);
    // });
    res.send(initialGraduationRates);
});

app.post(BASE_API_PATH + "/graduation-rates", (req, res) => {
    console.log(Date() + " - POST /graduation-rates");
    var data = req.body;
    initialGraduationRates.push(data);
    res.sendStatus(201);
});

//Al hacer un put a un recurso no concreto envía un código de error
app.put(BASE_API_PATH + "/graduation-rates", (req, res) => {
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/graduation-rates", (req, res) => {
    console.log(Date() + " - DELETE /graduation-rates");
    initialGraduationRates = [];

    //db.remove({});

    res.sendStatus(200);
});

//Recursos concretos
app.get(BASE_API_PATH + "/graduation-rates/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - GET /graduation-rates/" + province);
    res.send(initialGraduationRates.filter((c) => {
        return (c.province == province);
    })[0]);
});

app.delete(BASE_API_PATH + "/graduation-rates/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - DELETE /graduation-rates/" + province);
    initialGraduationRates = initialGraduationRates.filter((c) => {
        return (c.province != province);
    });
    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/graduation-rates/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - POST /graduation-rates/" + province);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/graduation-rates/:province", (req, res) => {
    var province = req.params.province;
    var data = req.body;
    console.log(Date() + " - PUT /graduation-rates/" + province);

    //db.update({"name":contact.name},contact,(err,numUpdate)=>{
    //    console.log("Update: "+numUpdate);
    //});
    //Comprobamos si hay incongruencias en los datos antes de actuar
    if (province != data.province) {
        res.sendStatus(409);
        return;
    }

    initialGraduationRates = initialGraduationRates.map((c) => {
        console.log("entra");
        if (c.province == data.province) {
            //res.sendStatus(200);
            return data;
        }
        else {
            //res.sendStatus(200);
            return c;
        }
    });
    res.sendStatus(200);
});



//################### Fin API REST de Andrés:


//################### Inicio API REST de Carlos:
var initialMedicalAttentionAccordingtoTypeRates = [{
        "province": "huelva",
        "year": 2015,
        "general medicine": 33.14,
        "nursing": 20.0,
        "social-work": 6.78
    },
    {
        "province": "seville",
        "year": 2015,
        "general medicine": 35.45,
        "nursing": 20.76,
        "social-work": 5.14
    }
];

app.get(BASE_API_PATH + "/medical-attention-according-to-type-rates/loadInitialData", (req, res) => {
    console.log(Date() + " - GET /graduationRates-rates/loadInitialData");
    if (initialMedicalAttentionAccordingtoTypeRates.length == 0) {
        initialMedicalAttentionAccordingtoTypeRates = [{
                "province": "huelva",
                "year": 2015,
                "general medicine": 33.14,
                "nursing": 20.0,
                "social-work": 6.78
            },
            {
                "province": "seville",
                "year": 2015,
                "general medicine": 35.45,
                "nursing": 20.76,
                "social-work": 5.14
            }
        ];
    }
    //Inicializamos los datos en caso de necesitarlo
    // db.find({},(err,medicalAttentionAccordingtoTypeRates)=>{
    //     if(err){
    //         console.error(" Error accesing DB");
    //         process.exit(1);
    //     }

    //     if(initialMedicalAttentionAccordingtoTypeRates.length == 0){
    //         console.log("Empty DB");
    //         db.insert(initialMedicalAttentionAccordingtoTypeRates);
    //     }else{
    //         console.log("DB initialized with "+medicalAttentionAccordingtoTypeRates.length+" medical-attention-according-to-type-rates ");
    //     }

    // });
    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
    console.log(Date() + " - GET /medical-attention-according-to-type-rates");
    //     db.find({},(err,MedicalAttentionAccordingtoTypeRates)=>{
    //      if(err){
    //          console.error(" Error accesing DB");
    //          res.sendStatus(500);
    //          return;
    //     }
    //     res.send(MedicalAttentionAccordingtoTypeRates);
    // });
    res.send(initialMedicalAttentionAccordingtoTypeRates);
});

app.post(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
    console.log(Date() + " - POST /medical-attention-according-to-type-rates");
    var data = req.body;
    initialMedicalAttentionAccordingtoTypeRates.push(data);
    res.sendStatus(201);
});
        

//Al hacer un put a un recurso no concreto envía un código de error
app.put(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
    console.log(Date() + " - PUT /medical-attention-according-to-type-rates");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
    console.log(Date() + " - DELETE /medical-attention-according-to-type-rates");
    initialMedicalAttentionAccordingtoTypeRates = [];

    //db.remove({});

    res.sendStatus(200);
});

//Recursos concretos

app.get(BASE_API_PATH + "/medical-attention-according-to-type-rates/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - GET /medical-attention-according-to-type-rates/" + province);
    res.send(initialMedicalAttentionAccordingtoTypeRates.filter((c) => {
        return (c.province == province);
    })[0]);
});

app.delete(BASE_API_PATH + "/medical-attention-according-to-type-rates/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - DELETE /medical-attention-according-to-type-rates/" + province);
    initialMedicalAttentionAccordingtoTypeRates = initialMedicalAttentionAccordingtoTypeRates.filter((c) => {
        return (c.province != province);
    });
    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/medical-attention-according-to-type-rates/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - POST /graduation-rates/" + province);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/medical-attention-according-to-type-rates/:province", (req, res) => {
    var province = req.params.province;
    var data = req.body;
    console.log(Date() + " - PUT /medical-attention-according-to-type-rates/" + province);

    //db.update({"name":contact.name},contact,(err,numUpdate)=>{
    //    console.log("Update: "+numUpdate);
    //});
    //Comprobamos si hay incongruencias en los datos antes de actuar
    if (province != data.province) {
        res.sendStatus(409);
        return;
    }

    initialMedicalAttentionAccordingtoTypeRates = initialMedicalAttentionAccordingtoTypeRates.map((c) => {
        console.log("entra");
        if (c.province == data.province) {
            res.sendStatus(200);
            return data;
        }
        else {
            res.sendStatus(200);
            return c;
        }
    });
});

//################### Fin API REST de Carlos:

*/



/*
app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY: " + e);
});
*/

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
