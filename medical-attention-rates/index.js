var medicalAttentionRates = {};
//SUBETE A GITHUB

var BASE_API_PATH = "/api/v1";
var BASE_API_PATH2 = "/api/v2";
module.exports = medicalAttentionRates;

medicalAttentionRates.register = function(app, db) {
    console.log("Registering routes for contacts API...");


    // GETS
    app.get(BASE_API_PATH + "/medical-attention-rates/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3897910/collection/RVu1HAqJ");
    });


    app.get(BASE_API_PATH + "/medical-attention-rates", (req, res) => {

        var object = {
            "year": parseInt(req.query.year),
            "general-medicine": parseFloat(req.query["general-medicine"]),
            "social-work": parseFloat(req.query["social-work"]),
            "nursing": parseFloat(req.query["nursing"])
        };
        //busqueda por intervalos
        var startYear = parseInt(req.query.from);
        var endYear = parseInt(req.query.to);
        //Variables para la paginación
        var limitAux = parseInt(req.query.limit);
        var offSetAux = parseInt(req.query.offset);

        //console.log(Object.keys(req.query).includes("year")); // includes es como contains en java
        //db.find({"year": { $gte: startYear, $lte: endYear }}).skip(offSetAux).limit(limitAux).toArray((err, doc)
        var isFirstVar = true;

        var mdbq = {};
        var consoleText = Date() + " - GET /medical-attention-rates";
        Object.keys(req.query).forEach((prop) => {
            if (Object.keys(object).includes(prop)) {
                var value = getTypeValue(object[prop], prop);
                mdbq[prop] = value;

                if (isFirstVar === true) {
                    var text = "?" + prop + "=" + value;
                    isFirstVar = false;
                }
                else {
                    var text = "&" + prop + "=" + value;
                }

                consoleText = consoleText + text;
            }
        });
        //mdbq["year"]={ $gte: startYear, $lte: endYear };
        //paginación + búsqueda por intervalos
        if (Number.isInteger(limitAux) && Number.isInteger(offSetAux) && Number.isInteger(startYear) && Number.isInteger(endYear)) {
            var text = "limitAux=" + limitAux + "&offset=" + offSetAux;
            console.log("?from=" + startYear + "&to=" + endYear + "&limit=" + limitAux + "&offset=" + offSetAux);
            db.find({ "year": { $gte: startYear, $lte: endYear } }).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                if (err) {
                    console.error(" Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                res.send(medicalAttentionRates.map((c) => {
                    delete c._id; //Quitamos el campo id
                    return c;
                }));

            });
        }
        else if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
            var text = "limitAux=" + limitAux + "&offset=" + offSetAux;
            consoleText = consoleText + text;
            console.log(consoleText);
            db.find(mdbq).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                if (err) {
                    console.error(" Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                res.send(medicalAttentionRates.map((c) => {
                    delete c._id; //Quitamos el campo id
                    return c;
                }));

            });
        }
        else {
            //no paginacion pero pusqueda con intervalos
            if (Number.isInteger(startYear) && Number.isInteger(endYear)) {
                console.log("?from=" + startYear + "&to=" + endYear);
                db.find({ "year": { $gte: startYear, $lte: endYear } }).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    res.send(medicalAttentionRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));

                });
            }
            else {
                db.find(mdbq).toArray((err, medicalAttentionRates) => {
                    console.log(consoleText);
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    res.send(medicalAttentionRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));

                });
            }
        }
    });



    //GET a un recurso concreto(HECHO)
    app.get(BASE_API_PATH + "/medical-attention-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        // console.log(province + "testeando");
        console.log(Date() + " - GET /medical-attention-rates/" + province + "/" + year);



        db.find({}).toArray((err, medicalAttentionRates) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            //console.log(medicalAttentionRates);
            //[0] para que no devuelva un array
            res.send(medicalAttentionRates.map((c) => {
                delete c._id; //Quitamos el campo id
                return c;
            }).filter(c => c.province == province & c.year == year)[0]);
        });
    });



    /*   
    //GET a un recurso concreto(no funciona no sé por qué)
    app.get(BASE_API_PATH + "/medical-attention-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        // console.log(province + "testeando");
        console.log(Date() + " - GET /medical-attention-rates/" + province + "/" + year);



        db.find({ "province": province, "year": year }).toArray((err, medicalAttentionRates) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            //console.log(medicalAttentionRates);
           res.send(medicalAttentionRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    })); //[0] para que no devuelva un array
        });
    });
    */



    //GET , busquedas, paginacion con provincia
    app.get(BASE_API_PATH + "/medical-attention-rates/:province", (req, res) => {
        var province = req.params.province;
        var object = {
            "year": parseInt(req.query.year),
            "general-medicine": parseFloat(req.query["general-medicine"]),
            "social-work": parseFloat(req.query["social-work"]),
            "nursing": parseFloat(req.query["nursing"])
        };
        //Variables para la paginación
        var limitAux = parseInt(req.query.limit);
        var offSetAux = parseInt(req.query.offset);

        //console.log(Object.keys(object).includes("province")); // includes es como contains en java

        var isFirstVar = true;

        var mdbq = {};
        var consoleText = Date() + " - GET /medical-attention-rates/" + province;
        Object.keys(req.query).forEach((prop) => {
            if (Object.keys(object).includes(prop)) {
                var value = getTypeValue(object[prop], prop);
                mdbq[prop] = value;

                if (isFirstVar === true) {
                    var text = "?" + prop + "=" + value;
                    isFirstVar = false;
                    console.log(prop);
                }
                else {
                    var text = "&" + prop + "=" + value;
                }


                consoleText = consoleText + text;
            }
        });
        mdbq["province"] = req.params.province;
        //paginación
        if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
            var text = "limitAux=" + limitAux + "&offset=" + offSetAux;
            consoleText = consoleText + text;
            console.log(consoleText);
            db.find(mdbq).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                if (err) {
                    console.error(" Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                if (medicalAttentionRates.length==0) {
                    console.error(" No existe el recurso");
                    res.sendStatus(404);
                    return;
                }
                res.send(medicalAttentionRates.map((c) => {
                    delete c._id; //Quitamos el campo id
                    return c;
                }));

            });
        }
        else {
            db.find(mdbq).toArray((err, medicalAttentionRates) => {
                console.log(consoleText);
                if (err) {
                    console.error(" Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                if (medicalAttentionRates.length==0) {
                    console.error(" No existe el recurso");
                    res.sendStatus(404);
                    return;
                }
                res.send(medicalAttentionRates.map((c) => {
                    delete c._id; //Quitamos el campo id
                    return c;
                }));

            });
        }
    });

    
    //POST a recurso general (HECHO)
    //POST to a general collection
    app.post(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        console.log(Date() + " - POST /medical-attention-rates");
        var data = req.body;
        var auxiliar = false;
        
        if (Object.keys(data).length > 5 || data["province"] == "" || data["year"] == null|| data["year"] == "" || 
            data["nursing"] == null || data["general-medicine"] == null || data["social-work"] == null || !data.hasOwnProperty("province") || !data.hasOwnProperty("year") ||
            !data.hasOwnProperty("nursing") || !data.hasOwnProperty("general-medicine") || !data.hasOwnProperty("social-work")) {
            res.sendStatus(400);
            console.error("Error 400");
            return;
        }
        db.find({ "province": data["province"], "year": data["year"] }).toArray((err, medicalAttentionRates) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            //en caso de que ya exista uno
            if (medicalAttentionRates.length > 0) {
                auxiliar = true;
                res.sendStatus(409);
                console.error(" Error 409");
                return;
            }
            //Cuando no hay ningún dato con esas propiedades año/provincia se introduce el dato
            if (medicalAttentionRates.length == 0) {
                db.insertOne(data, (err, numUpdated) => {
                    if (err) {
                        console.error("Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    console.log("Insert: " + numUpdated);
                    res.sendStatus(201);
                    console.error(" 201");
                });
            }
        });

    });




























    //PUT a un recurso general, no debe ser posible
    //PUT to a general collection, it must not be possible (HECHO)
    app.put(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        console.log(Date() + " - PUT /medical-attention-rates");
        res.sendStatus(405);
    });


    //DELETE a un recurso general, borra todo el contenido (HECHO)
    //DELETE to a general collection, it must delete the collection's objects
    app.delete(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        console.log(Date() + " - DELETE /medical-attention-rates");
        medicalAttentionRates = [];

        db.remove({});

        res.sendStatus(200);
    });



    //POST a un recurso concreto
    app.post(BASE_API_PATH + "/medical-attention-rates/:province", (req, res) => {
        var province = req.params.province;

        console.log(Date() + " - POST /medical-attention-rates/" + province);
        res.sendStatus(405); //método no permitido según la tabla azul

    });


    //DELETE a un recurso concreto(HECHO)
    app.delete(BASE_API_PATH + "/medical-attention-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = parseInt(req.params.year);

        console.log(Date() + " - DELETE /medical-attention-rates/" + province + "/" + year);
        db.remove({ "province": province, "year": year });
        res.sendStatus(200);
    });

    //PUT a un recurso concreto (HECHO)
    app.put(BASE_API_PATH + "/medical-attention-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = parseInt(req.params.year);
        var medicalAttentionRate = req.body;
        // var idAux = "";

        console.log(req.body);
        console.log(Date() + " - PUT /medical-attention-rates/" + province);

        if (province != medicalAttentionRate.province || year != medicalAttentionRate.year) {
            res.sendStatus(400);
            console.warn(Date() + "Hacking attempt!");
            return;
        }

        else {
            db.update({ "province": medicalAttentionRate.province, "year": medicalAttentionRate.year }, medicalAttentionRate, (err, numUpdated) => {
                console.log("Updated: " + numUpdated);
                res.sendStatus(200);
            });
        }
    });






















    //Funciones Auxiliares para el get


    function getTypeValue(value, type) {

        switch (type) {
            case "year":
                return parseInt(value);
            default:
                return parseFloat(value);
        }
    }
};
