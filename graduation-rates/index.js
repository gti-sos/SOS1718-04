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
        
        
        
       if (Object.keys(data).length > 5 ||!data.hasOwnProperty("province")|| !data.hasOwnProperty("year") ||
            !data.hasOwnProperty("public-school") || !data.hasOwnProperty("private-school") || !data.hasOwnProperty("charter-school")){
            res.sendStatus(400);
            return;
        }
        
        db.insertOne(data, (err, numUpdated) => {
            console.log("Insert: " + numUpdated);
        });
        
        
        res.sendStatus(201);
    });

//Al hacer un put a un recurso no concreto envía un código de error
app.put(BASE_API_PATH+"/graduation-rates",(req,res)=>{
    console.log(Date() + " - PUT /graduation-rates");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/graduation-rates",(req,res)=>{
    console.log(Date() + " - DELETE /graduation-rates");
    
    db.remove({});
    
    res.sendStatus(200);
});

//Recursos concretos
  app.get(BASE_API_PATH + "/graduation-rates/:province", (req, res) => {
        var provinceAux = req.params.province;
        var year = req.query["year"];
        var publicSchool = req.query["public-school"];
        var privateSchool = req.query["private-school"];
        var charterSchool = req.query["charter-school"];
        
        console.log(Date() + " - GET /graduation-rates/" + provinceAux + " {");
        console.log("year: "+year);
        console.log("public-school: "+publicSchool);
        console.log("private-school: "+privateSchool);
        console.log("charter-school: "+charterSchool);
        console.log("}");
        
        var queryDB = searchDB(year,publicSchool,privateSchool,charterSchool);
        console.log("query:" +queryDB);
        
        db.find({ province: provinceAux }).toArray((err, datas) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (datas.length == 0) {
                res.sendStatus(404);
                return;
            }
            /*if ( datas[0].length>5) {
                res.sendStatus(400);
                return;
            }*/
            res.send(datas.map((c) => {
                delete c._id; //Quitamos el campo id
                return c;
            })[0]);
        });
    });

app.delete(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - DELETE /graduation-rates/"+province);
    //initialGraduationRates = initialGraduationRates.filter((c)=>{
      //  return (c.province != province);
    //});
    db.remove({ "province": province });
    res.sendStatus(200);
});

app.post(BASE_API_PATH+"/graduation-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - POST /graduation-rates/"+province);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/graduation-rates/:province", (req, res) => {
        var province = req.params.province;
        var data = req.body;
        console.log(Date() + " - PUT /graduation-rates/" + province);
        
        if (province != data.province ||Object.keys(data).length > 5 || !data.hasOwnProperty("year")||
            !data.hasOwnProperty("public-school") || !data.hasOwnProperty("private-school") || !data.hasOwnProperty("charter-school"))
             {
            res.sendStatus(400);
            return;
        }
        db.update({ "province": data.province }, data, (err,numUpdated) => {
            console.log("Updated: " + numUpdated);
        
        });
        
        res.sendStatus(200);
    });
    
    
}
function searchDB(yearAux,publicSchoolAux,privateSchoolAux,charterSchoolAux){
    var ret = "";
    if(yearAux !== undefined){
        ret = ret + '"year": '+yearAux+",";
    }
    if(publicSchoolAux !== undefined){
        ret = ret + ' "public-school": '+publicSchoolAux+",";
    }
    if(privateSchoolAux !== undefined){
        ret = ret + ' "private-school": '+privateSchoolAux+",";
    }
    if(charterSchoolAux !== undefined){
        ret = ret + ' "charter-school": '+charterSchoolAux+",";
    }
    
    console.log("ret: "+ret)
    if(ret.substr(ret.length-1,ret.length-1) == ","){
        console.log("entr");
        ret = ret.substr(0,ret.length-1);
    }
    console.log("ret: "+ret);
    return ret;
}



//################### Fin API REST de Andrés:
