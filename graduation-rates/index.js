"use strict";
var graduationRates = {};
var BASE_API_PATH = "/api/v2";
var BASE_API_PATH1 = "/api/v1";

//var cors =require("cors");
//var request = require('request');

    module.exports = graduationRates;
    graduationRates.register = function(app, db) {
    console.log("Registering routes for graduation-rates API...");
    
 app.get(BASE_API_PATH + "/graduation-rates/docs", (req, res) => {
        console.log(Date() + " - GET /graduation-rates/docs");
        res.redirect("https://documenter.getpostman.com/view/3880256/collection/RVtyorWp")
    });
    
/*
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
*/ 

console.log("---BEGIN PROBAR LA API GraduationRates CON CURL---");
console.log("curl -v -XGET -H 'Content-type: application/json' 'https://sos1718-04.herokuapp.com/api/v2/graduation-rates'");
console.log("curl -v -XDELETE -H 'Content-type: application/json' 'https://sos1718-04.herokuapp.com/api/v2/graduation-rates'");
//console.log("curl -XPOST -H 'Content-type: application/json' -d '{\"province\": \"seville\",\"year\": 2017,\"public-school\": 80.7,\"private-school\": 98.2,\"charter-school\": 89.5}' 'https://sos1718-04.herokuapp.com/api/v2/graduation-rates'")
console.log("---END PROBAR LA API CON CURL---");
    

//OPERACIONES GENERALES
//GETS
   app.get(BASE_API_PATH + "/graduation-rates", (req, res) => {
        //Variable para el año
        var yearAux = parseInt(req.query.year);
        //Variables para el intervalo de años
        var startYear = parseInt(req.query.from);
        var endYear = parseInt(req.query.to);
        //Variables para la paginación
        var limitAux = parseInt(req.query.limit);
        var offSetAux = parseInt(req.query.offset);
        //Variables del recurso:
        var publicAux = req.query["public-school"]
        var privateAux = req.query["private-school"];
        var charterAux = req.query["charter-school"];
        if(Number.isInteger(yearAux)){
            if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                console.log(Date() + " - GET /graduation-rates?year="+yearAux+"&limit="+limitAux+"&offset="+offSetAux);
                db.find({"year": yearAux}).skip(offSetAux).limit(limitAux).toArray((err, graduationRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    res.send(graduationRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }else{
                console.log(Date() + " - GET /graduation-rates?year="+yearAux);
                db.find({"year": yearAux}).toArray((err, graduationRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    res.send(graduationRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }
        }else if(Number.isInteger(startYear) && Number.isInteger(endYear)){
            if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                console.log(Date() + " - GET /graduation-rates?from="+startYear+"&to="+endYear+"&limit="+limitAux+"&offset="+offSetAux);
                db.find({"year": { $gte: startYear, $lte: endYear }}).skip(offSetAux).limit(limitAux).toArray((err, doc) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    /*if (doc.length == 0) {
                        res.sendStatus(404);
                         console.error(" holita crak ");
                        return;
                    }*/
                    res.send(doc.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }else{
                console.log(Date() + " - GET /graduation-rates?from="+startYear+"&to="+endYear);
                db.find({"year": {$gte:startYear , $lte:endYear}}).toArray((err, doc) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (doc.length == 0) {
                        res.sendStatus(404);
                         console.error(" Error 404");
                        return;
                    }
                    res.send(doc.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }
        }else{
            if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                console.log(Date() + " - GET /graduation-rates?limit="+limitAux+"&offset="+offSetAux);
                
                if(offSetAux>=0){
                    db.find({}).skip(offSetAux).limit(limitAux).toArray((err, graduationRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    
                    res.send(graduationRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
                }else{
                    db.find({}).skip(0).limit(limitAux).toArray((err, graduationRates) => {
                    if (err) {
                        console.error(" Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    
                    res.send(graduationRates.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
                }
                
            }else{
                if(!(publicAux === undefined)){
                    publicAux = parseFloat(publicAux);
                    console.log(Date() + " - GET /graduation-rates?publicS="+publicAux);
                    db.find({"public-shool": {$gte: publicAux}}).toArray((err, graduationRates) => {
                        if (err) {
                            console.error(" Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        res.send(graduationRates.map((c) => {
                            delete c._id; //Quitamos el campo id
                            return c;
                        }));
                    });
                }else if(!(privateAux === undefined)){
                    privateAux = parseFloat(privateAux);
                    console.log(Date() + " - GET /graduation-rates?privateS="+privateAux);
                    db.find({"private-school": {$gte: privateAux}}).toArray((err, graduationRates) => {
                        if (err) {
                            console.error(" Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        res.send(graduationRates.map((c) => {
                            delete c._id; //Quitamos el campo id
                            return c;
                        }));
                    });
                }else if(!(charterAux === undefined)){
                    charterAux = parseFloat(charterAux);
                    console.log(Date() + " - GET /graduation-rates?charterS="+charterAux);
                    db.find({"charter-school": {$gte: charterAux}}).toArray((err, graduationRates) => {
                        if (err) {
                            console.error(" Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        res.send(graduationRates.map((c) => {
                            delete c._id; //Quitamos el campo id
                            return c;
                        }));
                    });
                
                }else{
                    console.log(Date() + " - GET /graduation-rates");
                    db.find({}).toArray((err, graduationRates) => {
                        if (err) {
                            console.error(" Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        res.send(graduationRates.map((c) => {
                            delete c._id; //Quitamos el campo id
                            return c;
                        }));
                    });
                }
            }
        }
    });
    
    
    
    

   app.post(BASE_API_PATH + "/graduation-rates", (req, res) => {
        console.log(Date() + " - POST /graduation-rates");
        var data = req.body;
        var auxiliar = false;
        console.log(data.province)
       if (Object.keys(data).length >5 ||data["province"]==""||data["year"]==null||
       data["public-school"]==null||data["private-school"]==null||data["charter-school"]==null||!data.hasOwnProperty("province")|| !data.hasOwnProperty("year") ||
            !data.hasOwnProperty("public-school") || !data.hasOwnProperty("private-school") || !data.hasOwnProperty("charter-school")){
            res.sendStatus(400);
            console.error("Error 400");
            return;
            }
       db.find({ "province": data["province"] ,  "year": data["year"] }).toArray((err, datas) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (datas.length > 0) {
                auxiliar = true;
                res.sendStatus(409);
                console.error(" Error 409");
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
                     console.error(" 201");
                });
            }
        });

    });

    //Al hacer un put a un recurso no concreto envía un código de error
    app.put(BASE_API_PATH+"/graduation-rates",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
     console.error(" Error 405");
});

    app.delete(BASE_API_PATH+"/graduation-rates",(req,res)=>{
    console.log(Date() + " - DELETE /graduation-rates");
    db.remove({});
    res.sendStatus(200);
     console.error(" 200");
});

    //Recursos concretos
    app.get(BASE_API_PATH + "/graduation-rates/:province", (req, res) => {
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
        //Variables del recurso:
        var publicAux = req.query["public-school"]
        var privateAux = req.query["private-school"];
        var charterAux = req.query["charter-school"];
        
        
       if(Number.isInteger(aux)){
            if(Number.isInteger(limitAux) && Number.isInteger(offSetAux)){
                console.log(Date() + " - GET /graduation-rates/" + aux+"?limit="+limitAux+"&offset="+offSetAux);
                db.find({ "year": aux }).skip(offSetAux).limit(limitAux).toArray((err, datas) => {
                    if (err) {
                        console.error("Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (datas.length == 0) {
                        res.sendStatus(404);
                         console.error(" Error 404");
                        return;
                    }
                    res.send(datas.map((c) => {
                        delete c._id; //Quitamos el campo id
                        return c;
                    }));
                });
            }else{
                console.log(Date() + " - GET /graduation-rates/" + aux);
                db.find({ "year": aux }).toArray((err, datas) => {
                    if (err) {
                        console.error("Error accesing DB");
                        res.sendStatus(500);
                        return;
                    }
                    if (datas.length == 0) {
                        res.sendStatus(404);
                         console.error(" Error 404");
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
                    console.log(Date() + " - GET /graduation-rates/" + provinceAux+"?from="+startYear+"&to="+endYear+"&limit="+limitAux+"&offset="+offSetAux);
                    db.find({"year": {$gte:startYear, $lte:endYear}, "province": provinceAux}).skip(offSetAux).limit(limitAux).toArray((err, datas) => {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        if (datas.length == 0) {
                            res.sendStatus(404);
                             console.error(" Error 404");
                            return;
                        }
                        res.send(datas.map((c) => {
                            delete c._id; //Quitamos el campo id
                            return c;
                        }));
                    });
                }else{
                    console.log(Date() + " - GET /graduation-rates/" + provinceAux+"?from="+startYear+"&to="+endYear);
                    db.find({"year": {$gte:startYear, $lte:endYear}, "province": provinceAux}).toArray((err, datas) => {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        if (datas.length == 0) {
                            res.sendStatus(404);
                             console.error(" Error 404");
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
                    console.log(Date() + " - GET /graduation-rates/" + provinceAux+"?limit="+limitAux+"&offset="+offSetAux);
                    db.find({ "province": provinceAux }).skip(offSetAux).limit(limitAux).toArray((err, datas) => {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        if (datas.length == 0) {
                            res.sendStatus(404);
                             console.error(" Error 404");
                            return;
                        }
                        res.send(datas.map((c) => {
                            delete c._id; //Quitamos el campo id
                            return c;
                        }));
                    });
                }else{
                     if(!(publicAux === undefined)){
                        publicAux = parseFloat(publicAux);
                        console.log(Date() + " - GET /graduation-rates/" + provinceAux + "?public-school=" + publicAux);
                        db.find({ "province": provinceAux, "public-school": {$gte: publicAux}}).toArray((err, datas) => {
                            if (err) {
                                console.error("Error accesing DB");
                                res.sendStatus(500);
                                return;
                            }
                            if (datas.length == 0) {
                                res.sendStatus(404);
                                 console.error(" Error 404");
                                return;
                            }
                            res.send(datas.map((c) => {
                                delete c._id; //Quitamos el campo id
                                return c;
                            }));
                        });
                    }else if(!(privateAux === undefined)){
                        privateAux = parseFloat(privateAux);
                        console.log(Date() + " - GET /graduation-rates/" + provinceAux + "?private-school="+privateAux);
                        db.find({ "province": provinceAux, "private-school": {$gte: privateAux}}).toArray((err, datas) => {
                            if (err) {
                                console.error("Error accesing DB");
                                res.sendStatus(500);
                                return;
                            }
                            if (datas.length == 0) {
                                res.sendStatus(404);
                                 console.error(" Error 404");
                                return;
                            }
                            res.send(datas.map((c) => {
                                delete c._id; //Quitamos el campo id
                                return c;
                            }));
                        });
                    }else if(!(charterAux === undefined)){
                        charterAux = parseFloat(charterAux);
                        console.log(Date() + " - GET /graduation-rates/" + provinceAux + "?charter-school="+charterAux);
                        db.find({ "province": provinceAux, "charter-school": {$gte: charterAux}}).toArray((err, datas) => {
                            if (err) {
                                console.error("Error accesing DB");
                                res.sendStatus(500);
                                return;
                            }
                            if (datas.length == 0) {
                                res.sendStatus(404);
                                 console.error(" Error 404");
                                return;
                            }
                            res.send(datas.map((c) => {
                                delete c._id; //Quitamos el campo id
                                return c;
                            }));
                        });
                    
                    }else{
                        console.log(Date() + " - GET /graduation-rates/" + provinceAux);
                        db.find({ "province": provinceAux }).toArray((err, datas) => {
                            if (err) {
                                console.error("Error accesing DB");
                                res.sendStatus(500);
                                return;
                            }
                            if (datas.length == 0) {
                                res.sendStatus(404);
                                 console.error(" Error 404");
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
       }
    });
    
    app.get(BASE_API_PATH + "/graduation-rates/:province/:year", (req, res) => {
        var provinceAux = req.params.province;
        var yearStringToProvince = req.params.year;
        var aux = parseInt(provinceAux);
        var yearAux = parseInt(req.params.year)
        if(Number.isInteger(aux)){
            console.log(Date() + " - GET /graduation-rates/" + aux+"/"+yearStringToProvince);
            db.find({ "year": aux, "province": yearStringToProvince }).toArray((err, datas) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                if (datas.length == 0) {
                    res.sendStatus(404);
                     console.error(" Error 404");
                    return;
                }
                res.send(datas.map((c) => {
                    delete c._id; //Quitamos el campo id
                    return c;
                }));
            });
        }else{
            console.log(Date() + " - GET /graduation-rates/" + provinceAux+"/"+yearAux);
            db.find({ "province": provinceAux, "year": yearAux }).toArray((err, datas) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                if (datas.length == 0) {
                    res.sendStatus(404);
                     console.error(" Error 404");
                    return;
                }
                res.send(datas.map((c) => {
                    delete c._id; //Quitamos el campo id
                    return c;
                })[0]);
            });
        }
    });

//DELETES 
app.delete(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - DELETE /graduation-rates/"+province);
    
    db.remove({"province": province });
    res.sendStatus(200);
});

app.delete(BASE_API_PATH+"/graduation-rates/:year",(req,res)=>{
    var year = parseInt(req.params.year);
    console.log(Date() + " - DELETE /graduation-rates/"+year);
    db.remove({"year": year });
    res.sendStatus(200);
});

app.delete(BASE_API_PATH+"/graduation-rates/:province/:year",(req,res)=>{
    var province = req.params.province;
    var year = parseInt(req.params.year);
    console.log(Date() + " - DELETE /graduation-rates/"+province+ "/"+ year);
 
    db.remove({ "province": province, "year":year });
    res.sendStatus(200);
});

//POST FALLO EN CONCRETO
app.post(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - POST /graduation-rates/"+province);
    res
    .sendStatus(405);
     console.error(" Error 405");
});
app.post(BASE_API_PATH+"/graduation-rates/:year",(req,res)=>{
    var year= req.params.year;
    console.log(Date() + " - POST /graduation-rates/"+year);
    res.sendStatus(405);
     console.error(" Error 405");
});
app.post(BASE_API_PATH+"/graduation-rates/:province/:year",(req,res)=>{
    var province = req.params.province;
    var year = req.params.year;
    console.log(Date() + " - POST /graduation-rates/"+province+"/"+year);
    res.sendStatus(405);
     console.error(" Error 405");
});
   app.put(BASE_API_PATH + "/graduation-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = parseInt(req.params.year);
        var data = req.body;
        console.log(Date() + " - PUT /graduation-rates/" + province);
        
        if (province != data.province ||Object.keys(data).length > 5 || year != parseInt(data.year)||
            !data.hasOwnProperty("public-school") || !data.hasOwnProperty("private-school") || !data.hasOwnProperty("charter-school"))
             {
            res.sendStatus(400);
             console.error(" Error 400");
            return;
        }
          
        if(data["province"]==null||data["year"]==null||data["public-school"]==null||
            data["private-school"]==null||data["charter-school"]==null){
            res.sendStatus(400);
            console.error("Error 400");
            return;
        }
            
        var yearAux = parseInt(data.year);
        db.update({ "province": data.province, "year": yearAux }, data, (err,numUpdated) => {
            console.log("Updated: " + numUpdated);
        
        });
       
        res.sendStatus(200);
    });
    //PUT NO CONCRETO
app.put(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
     console.error(" Error 405");
    });
app.put(BASE_API_PATH+"/graduation-rates/:year",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
     console.error(" Error 405");
    });
}





//v1

/*
//OPERACIONES GENERALES
//GETS
//GET CON PAGINACION
app.get(BASE_API_PATH + "/graduation-rates/limit=:limit&offset=:offset", (req, res) => {
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /graduation-rates"+"/limit="+limit +"&offset="+offset);
    
        db.find({}).skip(offset).limit(limit).toArray((err, graduationRates) => {
            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(graduationRates.map((c) => {
                delete c._id; 
                return c;
            }));
        });
    });
    
//GET NORMAL
app.get(BASE_API_PATH + "/graduation-rates", (req, res) => {
        console.log(Date() + " - GET /graduation-rates");
        db.find({}).toArray((err, graduationRates) => {
            if (err) {
                console.error(" Error accesing DB");
                res.sendStatus(500);
                return;
            }
            res.send(graduationRates.map((c) => {
                delete c._id; 
                return c;
            }));
        });
    });

//POST
 app.post(BASE_API_PATH + "/graduation-rates", (req, res) => {
        console.log(Date() + " - POST /graduation-rates");
        var data = req.body;
        var auxiliar = false;
        
       if (Object.keys(data).length > 5 ||!data.hasOwnProperty("province")|| !data.hasOwnProperty("year") ||
            !data.hasOwnProperty("public-school") || !data.hasOwnProperty("private-school") || !data.hasOwnProperty("charter-school")){
            res.sendStatus(400);
            return;
            }
       db.find({ "province": data["province"] }).toArray((err, datas) => {
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
//PUT PUT NO CONCRETO
app.put(BASE_API_PATH+"/graduation-rates",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
});
//DELETE RECURSO BASE
app.delete(BASE_API_PATH+"/graduation-rates",(req,res)=>{
    console.log(Date() + " - DELETE /graduation-rates");
    db.remove({});
    res.sendStatus(200);
});

/*
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------
-------------------


//Recursos SEMI concretos

app.get(BASE_API_PATH + "/graduation-rates/year=:year1&:year2", (req, res) => {
        var year1 = parseInt(req.params.year1);
        var year2 = parseInt(req.params.year2);
        console.log(Date() + " - GET /graduation-rates/year=" + year1+"-"+year2);
        db.find({"year": {$gte:year1 , $lte:year2}}).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
app.get(BASE_API_PATH + "/graduation-rates/year=:year", (req, res) => {
        var year = parseInt(req.params.year);
        console.log(Date() + " - GET /graduation-rates/year=" + year);
        db.find({"year": year}).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    
app.get(BASE_API_PATH + "/graduation-rates/public-school=:x1&:x2", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        console.log(Date() + " - GET /graduation-rates/public-school=" + x1 + "-"+x2);
        db.find({"public-school":{$gte:x1 , $lte:x2}}).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
app.get(BASE_API_PATH + "/graduation-rates/charter-school=:x1&:x2", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        console.log(Date() + " - GET /graduation-rates/charter-school=" + x1 + "-"+x2);
        db.find({"charter-school":{$gte:x1 , $lte:x2}}).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
app.get(BASE_API_PATH + "/graduation-rates/private-school=:x1&:x2", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        console.log(Date() + " - GET /graduation-rates/private-school=" + x1 + "-"+x2);
        db.find({"private-school":{$gte:x1 , $lte:x2}}).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });


//GET PROVINCE
app.get(BASE_API_PATH + "/graduation-rates/province=:province1&:province2", (req, res) => {
        var province1 = req.params.province1;
        var province2 = req.params.province2;
        console.log(Date() + " - GET /graduation-rates/province=" + province1+"-"+province2);
        db.find({"province": {$in:[province1, province2]} }).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    

app.get(BASE_API_PATH + "/graduation-rates/province=:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /graduation-rates/province=" + province);
        db.find({"province": province }).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    
////////////////////////
//PAGINACION
///////////////////////

//(PROVINCE)
app.get(BASE_API_PATH + "/graduation-rates/province=:province1&:province2/limit=:limit&offset=:offset", (req, res) => {
        var province1 = req.params.province1;
        var province2 = req.params.province2;
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /graduation-rates/province=" + province1+"-"+province2+"/limit="+limit+"&offset="+offset);
        db.find({"province": {$in:[province1, province2]} }).skip(offset).limit(limit).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    
app.get(BASE_API_PATH + "/graduation-rates/province=:province/limit=:limit&offset=:offset", (req, res) => {
    var province = req.params.province;
    var limit = parseInt(req.params.limit);
    var offset = parseInt(req.params.offset);
    console.log(Date() + " - GET /graduation-rates/" + province +"limit="+limit +"&offset="+offset);
        db.find({"province": province }).skip(offset).limit(limit).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });


//(YEAR)
app.get(BASE_API_PATH + "/graduation-rates/year=:year1&:year2/limit=:limit&offset=:offset", (req, res) => {
        var year1 = parseInt(req.params.year1);
        var year2 = parseInt(req.params.year2);
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /graduation-rates/year=" + year1+"-"+year2+"/limit="+limit+"&offset="+offset);
        db.find({"year": {$gte:year1 , $lte:year2}}).skip(offset).limit(limit).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
app.get(BASE_API_PATH + "/graduation-rates/year=:year/limit=:limit&offset=:offset", (req, res) => {
        var year = parseInt(req.params.year);
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /graduation-rates/" + year+"limit="+limit +"&offset="+offset);
        db.find({"year": year}).skip(offset).limit(limit).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    
//(SCHOOLS)
app.get(BASE_API_PATH + "/graduation-rates/public-school=:x1&:x2/limit=:limit&offset=:offset", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /graduation-rates/public-school=limit="+limit +"&offset="+offset);
        db.find({"public-school":{$gte:x1 , $lte:x2}}).skip(offset).limit(limit).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
app.get(BASE_API_PATH + "/graduation-rates/charter-school=:x1&:x2/limit=:limit&offset=:offset", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /graduation-rates/charter-school=limit="+limit +"&offset="+offset);
        db.find({"charter-school":{$gte:x1 , $lte:x2}}).skip(offset).limit(limit).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
app.get(BASE_API_PATH + "/graduation-rates/private-school=:x1&:x2/limit=:limit&offset=:offset", (req, res) => {
        var x1 = parseFloat(req.params.x1);
        var x2 = parseFloat(req.params.x2);
        var limit = parseInt(req.params.limit);
        var offset = parseInt(req.params.offset);
        console.log(Date() + " - GET /graduation-rates/private-school=limit="+limit +"&offset="+offset);
        db.find({"private-school":{$gte:x1 , $lte:x2}}).skip(offset).limit(limit).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            }));
        });
    });
    
//////////////////////////////////   
////////SUPERCONCRETO////////////
////////////////////////////////
//GET CONCRETO (PROVINCIA Y AÑO) No tiene sentido paginacion 
app.get(BASE_API_PATH + "/graduation-rates/province=:province/year=:year", (req, res) => {
    var province = req.params.province;
    var year = parseInt(req.params.year);
    console.log(Date() + " - GET /graduation-rates/" + province + "/"+ year);
        db.find({"province": province, "year": year}).toArray((err, doc) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            } if (doc.length == 0) {
                res.sendStatus(404);
                return;
            }
            res.send(doc.map
            ((c)=>{
               delete c._id;
               return c;
            })[0]);
        });
    });
    
    
    
    
//DELETES 
app.delete(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - DELETE /graduation-rates/"+province);
    
    db.remove({"province": province });
    res.sendStatus(200);
});

app.delete(BASE_API_PATH+"/graduation-rates/:year",(req,res)=>{
    var year = parseInt(req.params.year);
    console.log(Date() + " - DELETE /graduation-rates/"+year);
    db.remove({"year": year });
    res.sendStatus(200);
});

app.delete(BASE_API_PATH+"/graduation-rates/:province/:year",(req,res)=>{
    var province = req.params.province;
    var year = parseInt(req.params.year);
    console.log(Date() + " - DELETE /graduation-rates/"+province+ "/"+ year);
 
    db.remove({ "province": province, "year":year });
    res.sendStatus(200);
});





//POST FALLO EN CONCRETO
app.post(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - POST /graduation-rates/"+province);
    res
    .sendStatus(405);
});
app.post(BASE_API_PATH+"/graduation-rates/year=:year",(req,res)=>{
    var year= req.params.year;
    console.log(Date() + " - POST /graduation-rates/"+year);
    res.sendStatus(405);
});
app.post(BASE_API_PATH+"/graduation-rates/:province/:year",(req,res)=>{
    var province = req.params.province;
    var year = req.params.year;
    console.log(Date() + " - POST /graduation-rates/"+province+"/"+year);
    res.sendStatus(405);
});





//PUT
app.put(BASE_API_PATH + "/graduation-rates/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = parseInt(req.params.year);
        var data = req.body;
        console.log(Date() + " - PUT /graduation-rates/" + province);
        
        if (province != data.province ||Object.keys(data).length > 5 || year != data.year||
            !data.hasOwnProperty("public-school") || !data.hasOwnProperty("private-school") || !data.hasOwnProperty("charter-school"))
             {
            res.sendStatus(400);
            return;
        }
        var yearAux = parseInt(data.year);
        db.update({ "province": data.province, "year": yearAux }, data, (err,numUpdated) => {
            console.log("Updated: " + numUpdated);
        
        });
        res.sendStatus(200);
    });
    //PUT NO CONCRETO
app.put(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
    });
app.put(BASE_API_PATH+"/graduation-rates/:year",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
    });
}
*/

//################### Fin API REST de Andrés:

