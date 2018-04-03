var graduationRates = {};
var BASE_API_PATH = "/api/v1";

    module.exports = graduationRates;

    graduationRates.register = function(app, db) {

    console.log("Registering routes for graduation-rates API...");
    
    

 app.get(BASE_API_PATH + "/graduation-rates/docs", (req, res) => {
        console.log(Date() + " - GET /graduation-rates/docs");
        res.redirect("https://documenter.getpostman.com/view/3880256/collection/RVtyorWp")
    });
   
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


//Al hacer un put a un recurso no concreto envía un código de error
app.put(BASE_API_PATH+"/graduation-rates",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
});
app.put(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/graduation-rates",(req,res)=>{
    console.log(Date() + " - DELETE /graduation-rates");
    
    db.remove({});
    
    res.sendStatus(200);
});

//Recursos concretos

//GETS
 app.get(BASE_API_PATH + "/graduation-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /graduation-rates/" + province);
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
    
    app.get(BASE_API_PATH + "/graduation-rates/:province/:year", (req, res) => {
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
    //initialGraduationRates = initialGraduationRates.filter((c)=>{
      //  return (c.province != province);
    //});
    db.remove({ "province": province });
    res.sendStatus(200);
});
app.delete(BASE_API_PATH+"/graduation-rates/:province/:year",(req,res)=>{
    var province = req.params.province;
    var year = parseInt(req.params.year);
    console.log(Date() + " - DELETE /graduation-rates/"+province+ "/"+ year);
    //initialGraduationRates = initialGraduationRates.filter((c)=>{
      //  return (c.province != province);
    //});
    db.remove({ "province": province, "year":year });
    res.sendStatus(200);
});



//POST

app.post(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - POST /graduation-rates/"+province);
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
    

}




//################### Fin API REST de Andrés:
