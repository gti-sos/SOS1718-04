var unemploymentRates = {};
var BASE_API_PATH = "/api/v1";

module.exports = unemploymentRates;

unemploymentRates.register = function(app, db) {

    console.log("Registering routes for unemployment-rate API...");
    app.get(BASE_API_PATH + "/unemployment-rates/docs", (req, res) => {
        console.log(Date() + " - GET /graduation-rates/docs");
        res.redirect("https://documenter.getpostman.com/collection/view/3896692-d336a847-70db-4a3d-b1cb-9bc456d3c948")
    });

    app.get(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        //Variable para el año
        var yearAux = parseInt(req.query.year);
        //Variables para el intervalo de años
        var startYear = parseInt(req.query.from);
        var endYear = parseInt(req.query.to);
        //Variables para la paginación
        var limitAux = parseInt(req.query.limit);
        var offSetAux = parseInt(req.query.offset);
        
        if(Number.isInteger(yearAux)){
            if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                console.log(Date() + " - GET /unemployment-rates?year="+yearAux+"&limit="+limitAux+"&offset="+offSetAux);
                db.find({"year": yearAux}).skip(offSetAux).limit(limitAux).toArray((err, unemploymentRates) => {
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
            }else{
                console.log(Date() + " - GET /unemployment-rates?year="+yearAux);
                db.find({"year": yearAux}).toArray((err, unemploymentRates) => {
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
            }
        }else if(Number.isInteger(startYear) && Number.isInteger(endYear)){
            if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                console.log(Date() + " - GET /unemployment-rates?from="+startYear+"&to="+endYear+"&limit="+limitAux+"&offset="+offSetAux);
                db.find({"year": {"$gte":endYear , "$lte":startYear}}).skip(offSetAux).limit(limitAux).toArray((err, doc) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (doc.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    res.send(doc.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }else{
                console.log(Date() + " - GET /unemployment-rates?from="+startYear+"&to="+endYear);
                db.find({"year": {"$gte":endYear , "$lte":startYear}}).toArray((err, doc) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (doc.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    res.send(doc.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }
        }
        else{
            if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                console.log(Date() + " - GET /unemployment-rates?limit="+limitAux+"&offset="+offSetAux);
                db.find({}).skip(offSetAux).limit(limitAux).toArray((err, unemploymentRates) => {
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
            }else{
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
            }
        }
    });

    app.post(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - POST /unemployment-rates");
        var data = req.body;
        var auxiliar = false;
        //Comprobamos si hay incongruencias en los datos antes de actuar
        if (data.length > 8 || !data.hasOwnProperty("province") || !data.hasOwnProperty("year") || !data.hasOwnProperty("illiterate") ||
            !data.hasOwnProperty("first-grade") || !data.hasOwnProperty("second-grade") || !data.hasOwnProperty("third-degree") ||
            !data.hasOwnProperty("min-age") || !data.hasOwnProperty("max-age")) {
            res.sendStatus(400);
            return;
        }
        db.find({ "province": data["province"], "year": parseInt(data["year"]) }).toArray((err, datas) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (datas.length > 0) {
                auxiliar = true;
                res.sendStatus(409);
                return;
            }
            if (datas.length == 0) {
                db.insertOne(data, (err, numUpdated) => {
                    if (err) {
                        console.error("Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    console.log("Insert: " + numUpdated);
                    res.sendStatus(201);
                });
            }
        });

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
        //Variable que se pasa como parámetro en la URL
        var provinceAux = req.params.province;
        //La transformamos en un int para luego comprobar si es un año o no
        var aux = parseInt(provinceAux);
        //Variables para el intervalo de años
        var startYear = parseInt(req.query.from);
        var endYear = parseInt(req.query.to);
        //Variables para la paginación
        var limitAux = parseInt(req.query.limit);
        var offSetAux = parseInt(req.query.offset);
        
       if(Number.isInteger(aux)){
            if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                console.log(Date() + " - GET /unemployment-rates/" + aux+"?limit="+limitAux+"&offset="+offSetAux);
                db.find({ "year": aux }).skip(offSetAux).limit(limitAux).toArray((err, datas) => {
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
            }else{
                console.log(Date() + " - GET /unemployment-rates/" + aux);
                db.find({ "year": aux }).toArray((err, datas) => {
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
            }
       }else{
            if(Number.isInteger(startYear) && Number.isInteger(endYear)){
                if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                    console.log(Date() + " - GET /unemployment-rates/" + provinceAux+"?from="+startYear+"&to="+endYear+"&limit="+limitAux+"&offset="+offSetAux);
                    db.find({"year": {$gte:endYear, $lte:startYear}, "province": provinceAux}).skip(offSetAux).limit(limitAux).toArray((err, datas) => {
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
                }else{
                    console.log(Date() + " - GET /unemployment-rates/" + provinceAux+"?from="+startYear+"&to="+endYear);
                    db.find({"year": {$gte:endYear, $lte:startYear}, "province": provinceAux}).toArray((err, datas) => {
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
                }
            }else{
                if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                    console.log(Date() + " - GET /unemployment-rates/" + provinceAux+"?limit="+limitAux+"&offset="+offSetAux);
                    db.find({ "province": provinceAux }).skip(offSetAux).limit(limitAux).toArray((err, datas) => {
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
                }else{
                    console.log(Date() + " - GET /unemployment-rates/" + provinceAux);
                    db.find({ "province": provinceAux }).toArray((err, datas) => {
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
                }
            }
       }
    });
    
    app.get(BASE_API_PATH + "/unemployment-rates/:province/:year", (req, res) => {
        var provinceAux = req.params.province;
        var yearStringToProvince = req.params.year; //Esta variable se usa en caso de que el orden esté invertido de manera que reflejará la provincia
        var yearAux = parseInt(req.params.year)
        var aux = parseInt(provinceAux);
        
        if(Number.isInteger(aux)){
            console.log(Date() + " - GET /unemployment-rates/" + aux+"/"+yearStringToProvince);
            db.find({ "year": aux, "province": yearStringToProvince }).toArray((err, datas) => {
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
        }else{
            console.log(Date() + " - GET /unemployment-rates/" + provinceAux+"/"+yearAux);
            db.find({ "province": provinceAux, "year": yearAux }).toArray((err, datas) => {
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
        }
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

    app.put(BASE_API_PATH + "/unemployment-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var yearAux = parseInt(req.params.year);
        var data = req.body;
        console.log(Date() + " - PUT /unemployment-rates/" + province);

        //Comprobamos si hay incongruencias en los datos antes de actuar
        if (province != data.province || data.length > 8 || !data.hasOwnProperty("year") || !data.hasOwnProperty("illiterate") ||
            !data.hasOwnProperty("first-grade") || !data.hasOwnProperty("second-grade") || !data.hasOwnProperty("third-degree") ||
            !data.hasOwnProperty("min-age") || !data.hasOwnProperty("max-age") || yearAux != data.year) {
            res.sendStatus(400);
            return;
        }
        db.update({ "province": data.province, "year": yearAux }, data, (err, numUpdated) => {
            console.log("Udapted: " + numUpdated);
        });

        res.sendStatus(200);
    });

}

