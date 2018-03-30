var unemploymentRates = {};
var BASE_API_PATH = "/api/v1";

module.exports = unemploymentRates;

unemploymentRates.register = function(app, db) {

    console.log("Registering routes for unemployment-rate API...");

    //Debería ir pero no entiendo por que no funciona
    app.get(BASE_API_PATH + "/unemployment-rates/help", (res, req) => {
        return res.redirect('https://documenter.getpostman.com/view/3896692/sos1718-04-unemployment-rates-v1/RVnZgdXZ');
    });

    app.get(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - GET /unemployment-rates");
        db.find({}).toArray((err, unemploymentRates) => {
            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(unemploymentRates.map((c) => {
                delete c._id; //Quitamos el campo id
                return c;
            }));
        });
    });

    app.post(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - POST /unemployment-rates");
        var data = req.body;
        //Comprobamos si hay incongruencias en los datos antes de actuar
        if (data.length > 8 || !data.hasOwnProperty("province") || !data.hasOwnProperty("year") || !data.hasOwnProperty("illiterate") ||
            !data.hasOwnProperty("first-grade") || !data.hasOwnProperty("second-grade") || !data.hasOwnProperty("third-degree") ||
            !data.hasOwnProperty("min-age") || !data.hasOwnProperty("max-age")) {
            res.sendStatus(400);
            return;
        }
        // db.find({},{province: data.province}).toArray((err, unemploymentRatesAuxiliar) => {
        //     if (err) {
        //         console.error(" Error accesing DB");
        //         res.sendStatus(500);
        //         return;
        //     }
        //     if(unemploymentRatesAuxiliar.length > 0){
        //         res.sendStatus(409);
        //         return;
        //     }
        // });
        db.insertOne(data, (err, numUpdated) => {
            console.log("Insert: " + numUpdated);
        });
        res.sendStatus(201);
    });

    //Al hacer un put a un recurso no concreto envía un código de error
    app.put(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - PUT /unemployment-rates");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - DELETE /unemployment-rates");

        db.remove({});

        res.sendStatus(200);
    });

    //Recursos concretos
    app.get(BASE_API_PATH + "/unemployment-rates/:province", (req, res) => {
        var provinceAux = req.params.province;
        /*
        [{"province":"sevilla","year":1981,"illiterate":3.7,"first-grade":5.1,"second-grade":24.9,
        "third-degree":0.1,"min-age":16,"max-age":19}]*/
        var year = req.query["year"];
        var illiterate = req.query["illiterate"];
        var firstGrade = req.query["first-grade"];
        var secondGrade = req.query["second-grade"];
        var thirdDegre = req.query["third-degre"];
        var minAge = req.query["min-age"];
        var maxAge = req.query["max-age"];
        
        console.log(Date() + " - GET /unemployment-rates/" + provinceAux + " {");
        console.log("year: "+year);
        console.log("illiterate: "+illiterate);
        console.log("first-grade: "+firstGrade);
        console.log("second-grade: "+secondGrade);
        console.log("third-degre: "+thirdDegre);
        console.log("min-age: "+minAge);
        console.log("max-age: "+maxAge);
        console.log("}");
        
        var queryDB = searchDB(year,illiterate,firstGrade,secondGrade,thirdDegre,minAge,maxAge);
        console.log("query:" +queryDB);
        //El error esta aquí:
        db.find({ province: provinceAux}).toArray((err, datas) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (datas.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(datas.map((c) => {
                delete c._id; //Quitamos el campo id
                return c;
            }));
        });
    });

    app.delete(BASE_API_PATH + "/unemployment-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /unemployment-rates/" + province);
        // initialUnemploymentRates = initialUnemploymentRates.filter((c) => {
        //     return (c.province != province);
        // });
        db.remove({ "province": province });
        res.sendStatus(200);
    });

    app.post(BASE_API_PATH + "/unemployment-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST /unemployment-rates/" + province);
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/unemployment-rates/:province", (req, res) => {
        var province = req.params.province;
        var data = req.body;
        console.log(Date() + " - PUT /unemployment-rates/" + province);

        //Comprobamos si hay incongruencias en los datos antes de actuar
        if (province != data.province || data.length > 8 || !data.hasOwnProperty("year") || !data.hasOwnProperty("illiterate") ||
            !data.hasOwnProperty("first-grade") || !data.hasOwnProperty("second-grade") || !data.hasOwnProperty("third-degree") ||
            !data.hasOwnProperty("min-age") || !data.hasOwnProperty("max-age")) {
            res.sendStatus(400);
            return;
        }
        db.update({ "province": data.province }, data, (err, numUpdated) => {
            console.log("Udapted: " + numUpdated);
        });

        // initialUnemploymentRates = initialUnemploymentRates.map((c) => {
        //     console.log("entra");
        //     if (c.province == data.province) {
        //         //res.sendStatus(200);
        //         return data;
        //     }
        //     else {
        //         //res.sendStatus(200);
        //         return c;
        //     }
        // });
        res.sendStatus(200);
    });

}

function searchDB(yearAux,illiterateAux,firstGradeAux,secondGradeAux,thirdDegreAux,minAgeAux,maxAgeAux){
    var ret = "";
    if(yearAux !== undefined){
        ret = ret + ', year: '+yearAux+",";
    }
    if(illiterateAux !== undefined){
        ret = ret + ' illiterate: '+illiterateAux+",";
    }
    if(firstGradeAux !== undefined){
        ret = ret + ' first-grade: '+firstGradeAux+",";
    }
    if(secondGradeAux !== undefined){
        ret = ret + ' second-grade: '+secondGradeAux+",";
    }
    if(thirdDegreAux !== undefined){
        ret = ret + ' third-degre: '+thirdDegreAux+",";
    }
    if(minAgeAux !== undefined){
        ret = ret + ' min-age: '+minAgeAux+",";
    }
    if(maxAgeAux !== undefined){
        ret = ret + ' max-age: '+maxAgeAux;
    }
    console.log("ret: "+ret)
    if(ret.substr(ret.length-1,ret.length-1) == ","){
        console.log("entr");
        ret = ret.substr(0,ret.length-1);
    }
    console.log("ret: "+ret);
    return ret;
}
//################### Fin API REST de Cristian:
