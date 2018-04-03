var medicalAttentionRates = {};

var BASE_API_PATH = "/api/v1";
module.exports = medicalAttentionRates;

medicalAttentionRates.register = function(app, db) {
    console.log("Registering routes for contacts API...");

    app.get(BASE_API_PATH + "/medical-attention-rates/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3897910/collection/RVu1HAqJ");
    });

    app.get(BASE_API_PATH + "/medical-attention-rates", (req, res) => {
        console.log(Date() + " - GET /medical-attention-ratesprueba");

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
            res.send(medicalAttentionRates.filter(c => c.province == province & c.year == year)[0]); //[0] para que no devuelva un array
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
        */else{
        db.update({ "province": medicalAttentionRate.province, "year": medicalAttentionRate.year }, medicalAttentionRate, (err, numUpdated) => {
            console.log("Updated: " + numUpdated);
            res.sendStatus(200);
        });
        }
    });
    
    //get por intervalos de años

    
    app.get(BASE_API_PATH + "/medical-attention-rates?from=:initialYear", (req, res) => {
        var initialYear = req.param.from;
        console.log("AÑO INICIAL:");
        console.log("AÑO INICIAL:" + initialYear);
        console.log(Date() + " - GET /medical-attention-rates");

    });

};