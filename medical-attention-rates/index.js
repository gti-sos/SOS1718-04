var medicalAttentionRates = {};

var BASE_API_PATH = "/api/v1";
module.exports = medicalAttentionRates;

medicalAttentionRates.register = function(app, db) {
    console.log("Registering routes for contacts API...");

    app.get(BASE_API_PATH + "/help", (req, res) => {
        res.redirect("url");
    });

    app.get(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        console.log(Date() + " - GET /medical-attention-rates");

        db.find({}).toArray((err, medicalAttentionRates) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(medicalAttentionRates.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    //POST a recurso general (HECHO)
    //POST to a general collection
    app.post(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        console.log(Date() + " - POST /medical-attention-rates");
        var data = req.body;
        var province = req.body.province;
        var year = req.body.year;
        console.log("provincia input : " + province + ", year input : " + year);


        //comprobamos si el dato que se va a introducir contiene algún error, tamañi y nombre de las propiedades
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
            res.send(medicalAttentionRates.filter(c => c.province == province & c.year == year));
        });
    });


    app.get(BASE_API_PATH + "/medical-attention-rates/:province", (req, res) => {
        var province = req.params.province;
        // console.log(province + "testeando");
        console.log(Date() + " - GET /medical-attention-rates/" + province);



        db.find({}).toArray((err, medicalAttentionRates) => {

            //console.log(medicalAttentionRates);
            if (medicalAttentionRates.filter(c => c.province == province).length == 0) {
                res.sendStatus(404); //Not found
            }
            else if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;

            }
            else
                res.send(medicalAttentionRates.filter(c => c.province == province));

        });

    });


    //POST a un recurso concreto
    app.post(BASE_API_PATH + "/medical-attention-rates/:province", (req, res) => {
        var province = req.params.province;

        console.log(Date() + " - POST /medical-attention-rates/" + province);
        res.sendStatus(405); //método no permitido según la tabla azul

    });


    //DELETE a un recurso concreto
    //no funciona bien 
    app.delete(BASE_API_PATH + "/medical-attention-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - DELETE /medical-attention-rates/" + province + "/" + year);
        db.remove({ "province": province, "year": year });
        //No borra ninguno , si coloco solo provincia funciona pero borra todos , y no es el objetivo en mi opinion
        res.sendStatus(200);
    });

    //PUT a un recurso concreto (HECHO)
    app.put(BASE_API_PATH + "/medical-attention-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var medicalAttentionRate = req.body;

        console.log(Date() + " - PUT /medical-attention-rates/" + province);

        if (province != medicalAttentionRate.province || year != medicalAttentionRate.year) {
            res.sendStatus(409);
            console.warn(Date() + "Hacking attempt!");
            return;
        }


        db.update({ "province": medicalAttentionRate.province, "year": medicalAttentionRate.year }, medicalAttentionRate, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);
        });

        res.sendStatus(200);
    });

};












/*
medicalAttentionAccordingToTypeRates.register = function(app, db) {
        console.log("Registering routes for contacts API...");

        app.get(BASE_API_PATH + "/help", (req, res) => {
            res.redirect("https://documenter.getpostman.com/view/359472/collection/RVnWhyva"); //hay que cambiar esto a mi link
        });

        /*
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
        });*/
/*
        app.get(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
            console.log(Date() + " - GET /medical-attention-according-to-type-rates");

            db.find({}).toArray((err, medicalAttentionAccordingToTypeRates) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                res.send(medicalAttentionAccordingToTypeRates.map((c) => {
                    delete c._id;
                    return c;
                }));
            });

        });


        /*
        app.post(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
            console.log(Date() + " - POST /medical-attention-according-to-type-rates");
            var data = req.body;
            initialMedicalAttentionAccordingtoTypeRates.push(data);
            res.sendStatus(201);
        });
        */
/*
        app.post(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
                console.log(Date() + " - POST /medical-attention-according-to-type-rates");
                var data = req.body;
                db.find({}, (err, medicalAttentionAccordingToTypeRates) => {
                    if (err) {
                        console.error("Error accesing DB(carmontap)");
                        process.exit(1);
                    }
                    if (data.length() != 5 || !data.hasOwnProperty("province") || !data.hasOwnProperty("year") || !data.hasOwnProperty("general-medicine") ||
                        !data.hasOwnProperty("nursing") || !data.hasOwnProperty("social-work")) {
                        console.error("Error al hacer un put(carmontap)");
                        res.sendStatus(400);
                        return;
                    }

                    db.insertOne(data, (err, numUpdated) => {
                        console.log("Insert: " + numUpdated);
                    });
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

            }
        }
}
*/
