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


    app.get(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        var object = {
            "year": parseInt(req.query.year),
            "general-medicine": parseFloat(req.query["general-medicine"]),
            "social-work": parseFloat(req.query["social-work"]),
            "nursing": parseFloat(req.query["nursing"])
        };
        //Variables para la paginación
        var limitAux = parseInt(req.query.limit);
        var offSetAux = parseInt(req.query.offset);

        //console.log(Object.keys(req.query).includes("year")); // includes es como contains en java

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






















    //Funciones Auxiliares


    function getTypeValue(value, type) {

        switch (type) {
            case "year":
                return parseInt(value);
            default:
                return parseFloat(value);
        }
    }
};
