var medicalAttentionRates = {};
//SUBETE A GITHUB

var BASE_API_PATH = "/api/v1";
module.exports = medicalAttentionRates;

medicalAttentionRates.register = function(app, db) {
    console.log("Registering routes for contacts API...");


    // GETS
    app.get(BASE_API_PATH + "/medical-attention-rates/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3897910/collection/RVu1HAqJ");
    });
    /*
    //GET Recurso general
    app.get(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        //Variable para el año
        var yearAux = parseInt(req.query.year, 10);
        //Variables para el intervalo de años
        var startYear = parseInt(req.query.from, 10);
        var endYear = parseInt(req.query.to, 10);
        //Variables para intervalos propiedad general-medicine
        var startGeneralMedicine = parseFloat(req.query["general-medicine"]);
        var endGeneralMedicine = parseFloat(req.query["general-medicine"]);
        //Variables para la paginación
        var limitAux = parseInt(req.query.limit);
        var offSetAux = parseInt(req.query.offset);

        if (Number.isInteger(yearAux)) {
            if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
                console.log(Date() + " - GET /medical-attention-rates?year=" + yearAux + "&limit=" + limitAux + "&offset=" + offSetAux);
                db.find({ "year": yearAux }).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
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
                console.log(Date() + " - GET /medical-attention-rates?year=" + yearAux);
                db.find({ "year": yearAux }).toArray((err, medicalAttentionRates) => {
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
        else if (Number.isInteger(startYear) && Number.isInteger(endYear)) {
            if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
                console.log(Date() + " - GET /medical-attention-rates?from=" + startYear + "&to=" + endYear + "&limit=" + limitAux + "&offset=" + offSetAux);
                db.find({ "year": { "$gte": startYear, "$lte": endYear } }).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (medicalAttentionRates.length == 0) {
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
                console.log(Date() + " - GET /medical-attention-rates?from=" + startYear + "&to=" + endYear);
                db.find({ "year": { "$gte": startYear, "$lte": endYear } }).toArray((err, medicalAttentionRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (medicalAttentionRates.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    res.send(medicalAttentionRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }
        }
            //propiedad
                else if (Number.isInteger(startGeneralMedicine) && Number.isInteger(endGeneralMedicine)) {
            if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
                console.log(Date() + " - GET /medical-attention-rates?from=" + startGeneralMedicine + "&to=" + endGeneralMedicine + "&limit=" + limitAux + "&offset=" + offSetAux);
                db.find({ "general-medicine": { "$gte": startGeneralMedicine, "$lte": endGeneralMedicine } }).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (medicalAttentionRates.length == 0) {
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
                console.log(Date() + " - GET /medical-attention-rates?from=" + startYear + "&to=" + endYear);
                db.find({ "year": { "$gte": startYear, "$lte": endYear } }).toArray((err, medicalAttentionRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (medicalAttentionRates.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    res.send(medicalAttentionRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }
        }
        
        
        
        
        
        else {
            if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
                console.log(Date() + " - GET /medical-attention-rates?limit=" + limitAux + "&offset=" + offSetAux);
                db.find({}).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
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
                console.log(Date() + " - GET /medical-attention-rates");
                db.find({}).toArray((err, medicalAttentionRates) => {
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
    */



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

    app.get(BASE_API_PATH + "/medical-attention-rates/:province", (req, res) => {
        //Variable que se pasa como parámetro en la URL
        var provinceAux = req.params.province;
        //La transformamos en un int para luego comprobar si es un año o no
        var aux = parseInt(provinceAux);
        //Variables para el intervalo de años
        var startYear = parseInt(req.query.from, 10);
        var endYear = parseInt(req.query.to, 10);
        //Variables para la paginación
        var limitAux = parseInt(req.query.limit, 10);
        var offSetAux = parseInt(req.query.offset, 10);

        if (Number.isInteger(aux)) {
            if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
                console.log(Date() + " - GET /medical-attention-rates/" + aux + "?limit=" + limitAux + "&offset=" + offSetAux);
                db.find({ "year": aux }).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                    if (err) {
                        console.error("Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (medicalAttentionRates.length == 0) {
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
                console.log(Date() + " - GET /medical-attention-rates/" + aux);
                db.find({ "year": aux }).toArray((err, medicalAttentionRates) => {
                    if (err) {
                        console.error("Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (medicalAttentionRates.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    res.send(medicalAttentionRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }
        }
        else {
            if (Number.isInteger(startYear) && Number.isInteger(endYear)) {
                if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
                    console.log(Date() + " - GET /medical-attention-rates/" + provinceAux + "?from=" + startYear + "&to=" + endYear + "&limit=" + limitAux + "&offset=" + offSetAux);
                    db.find({ "year": { $gte: startYear, $lte: endYear }, "province": provinceAux }).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        if (medicalAttentionRates.length == 0) {
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
                    console.log(Date() + " - GET /medical-attention-rates/" + provinceAux + "?from=" + startYear + "&to=" + endYear);
                    db.find({ "year": { $gte: startYear, $lte: endYear }, "province": provinceAux }).toArray((err, medicalAttentionRates) => {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        if (medicalAttentionRates.length == 0) {
                            res.sendStatus(404);
                            return;
                        }
                        res.send(medicalAttentionRates.map((c) => {
                            delete c._id; //Quitamos el campo id
                            return c;
                        }));
                    });
                }
            }
            else {
                if (Number.isInteger(limitAux) && Number.isInteger(offSetAux)) {
                    console.log(Date() + " - GET /medical-attention-rates/" + provinceAux + "?limit=" + limitAux + "&offset=" + offSetAux);
                    db.find({ "province": provinceAux }).skip(offSetAux).limit(limitAux).toArray((err, medicalAttentionRates) => {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        if (medicalAttentionRates.length == 0) {
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
                    console.log(Date() + " - GET /medical-attention-rates/" + provinceAux);
                    db.find({ "province": provinceAux }).toArray((err, medicalAttentionRates) => {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        if (medicalAttentionRates.length == 0) {
                            res.sendStatus(404);
                            return;
                        }
                        res.send(medicalAttentionRates.map((c) => {
                            delete c._id; //Quitamos el campo id
                            return c;
                        }));
                    });
                }
            }
        }
    });




    //POST a recurso general (HECHO)
    //POST to a general collection
    app.post(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        console.log(Date() + " - POST /medical-attention-rates");
        var data = req.body;
        var province = req.body.province;
        var year = req.body.year;
        console.log("provincia input : " + province + ", year input : " + year);


        //comprobamos si el dato que se va a introducir contiene algún error, tamaño y nombre de las propiedades
        //we have to validate the data that we insert in the database, if exist some error we send a error message.
        if (Object.keys(data).length > 5 || !data.hasOwnProperty("province") || !data.hasOwnProperty("year") ||
            !data.hasOwnProperty("general-medicine") || !data.hasOwnProperty("nursing") || !data.hasOwnProperty("social-work")) {
            res.sendStatus(400);
            return;
        }
        db.find({ "province": province, "year": year }).toArray((err, medicalAttentionRates) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            //en caso de que no haya errores , insertamos el dato a la base de datos
            //if there is not any error, the data will be inserted in the database


            else if (medicalAttentionRates.length == 0) { //esta condicion es si ya esta creado un objeto con esos datos
                db.insertOne(data, (err, numUpdated) => {
                    console.log("Insert: " + numUpdated);
                });
                res.sendStatus(201);
            }
            else {
                console.log("Error the object was created before.");
                res.sendStatus(409);
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
        var idAux = "";

        db.find({}).toArray((err, medicalAttentionRates) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            //console.log(medicalAttentionRates);
            //console.log("_id ="+medicalAttentionRates.filter(c => c.province == province & c.year == year)[0]["_id"]); //[0] para que no devuelva un array
            idAux = medicalAttentionRates.filter(c => c.province == province & c.year == year)[0]["_id"];

        });
        //añadiendo prueba codigo

        //console.log("el id" + medicalAttentionRate._id);

        console.log(Date() + " - PUT /medical-attention-rates/" + province);

        if (province != medicalAttentionRate.province || year != medicalAttentionRate.year) {
            res.sendStatus(400);
            console.warn(Date() + "Hacking attempt!");
            return;
        }
        /*console.log("idAux   "+idAux);
        if(idAux === medicalAttentionRate._id){
            console.log("Error el id del elemento a modificar es diferente al enviado" + 
            
            idAux +"!=" + medicalAttentionRate._id);
             res.sendStatus(400);
        }
        */
        else {
            db.update({ "province": medicalAttentionRate.province, "year": medicalAttentionRate.year }, medicalAttentionRate, (err, numUpdated) => {
                console.log("Updated: " + numUpdated);
                res.sendStatus(200);
            });
        }
    });

    app.get(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        var object = {
            "year": parseInt(req.query.year),
            "general-medicine" : parseFloat(req.query["general-medicine"]),
            // "general-medicine" :req.query,
             "nursing" :  parseFloat(req.query["nursing"])
        };

        console.log(Object.keys(req.query).includes("year")); // includes es como contains en java
        var mdbq = {};

        Object.keys(req.query).forEach((prop) => {
            if (Object.keys(object).includes(prop)) {
                var value = getTypeValue(object[prop], typeOfImproved(object[prop]));
                console.log("prop : " + prop);
                console.log("object prop :" +  Number.isInteger(prop));
                console.log("value :" + value + " es entero : " +typeOfImproved(value));
                mdbq[prop] = value;
                console.log("mdbq : " + mdbq["year"]);
               // var prueba = [];
               // prueba["year"]=21;
               // console.log("prueba de array"+prueba);
               // console.log("array :"+ mdbq.toString());
            }
        });
        db.find(mdbq).toArray((err, medicalAttentionRates) => {

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


    });

    function getTypeValue(value, type) {

        switch (type) {
            case "year":
                return parseInt(value);
            default:
                return parseFloat(value);
        }
    }

    //función auxiliar que al introducir cualquier valor, te devuelve el tipo que es , es una versión mejorada del operando
    // type of, la he obtenido de : https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
    //desarrollado por Angus Croll
    function typeOfImproved(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }

    // console.log(getTypeValue(90,"int"));
    // console.log(getType(34.2));
    //console.log(typeOfImproved("hola"));
    //console.log(typeOfImproved(34));





};
