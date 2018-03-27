//################### Inicio API REST de Andrés:
var graduationRates = {};
var BASE_API_PATH = "/api/v1";

module.exports = graduationRates;

graduationRates.register = function(app, db) {

    console.log("Registering routes for contacts API...");


//var initialGraduationRates = [
/*        { 
            "province" :"huelva", 
            "year" : 2015, 
            "public school" :79.4 , 
            "private school" : 100.0 , 
            "charter school" :83.9 
        },
        { 
           "province": "seville", 
           "year": 2015, 
           "public school" :80.9 , 
           "private school":98.2 ,
           "charter school" :89.5
        }
    ]; 
    */

// Descomentar en caso de hacer persistencia
// var db = new DataStore({
//     filename: dbFileName,
//     autoload: true
// });

// db.find({},(err,graduationRates)=>{
//     if(err){
//         console.error(" Error accesing DB");
//         process.exit(1);
//     }
    
//     if(graduationRates.length == 0){
//         console.log("Empty DB");
//         db.insert(initualGraduationRates);
//     }else{
//         console.log("DB initialized with "+graduationRates.length+" graduation-rates");
//     }
    
// });

/*app.get(BASE_API_PATH+"/graduation-rates/loadInitialData",(req,res)=>{
    console.log(Date() + " - GET /graduation-rates/loadInitialData");
    if(initialGraduationRates.length == 0){
        initialGraduationRates = [
        { 
            "province" :"huelva", 
            "year" : 2015, 
            "public school" :79.4 , 
            "private school" : 100.0 , 
            "charter school" :83.9 
        },
        { 
           "province": "seville", 
           "year": 2015, 
           "public school" :80.9 , 
           "private school":98.2 ,
           "charter school" :89.5
        },
          { 
            "province" :"malaga", 
            "year" : 2015, 
            "public school" :78.1 , 
            "private school" : 96.4 , 
            "charter school" :87.7 
        },
        { 
           "province": "huelva", 
           "year": 2016, 
           "public school" :83.24 , 
           "private school":94.12 ,
           "charter school" :86.31
        },
        { 
           "province": "seville", 
           "year": 2016, 
           "public school" :83.77 , 
           "private school":92.74 ,
           "charter school" :91.04
        }

    ];
}
    //Inicializamos los datos en caso de necesitarlo
    // db.find({},(err,gruaduationRates)=>{
    //     if(err){
    //         console.error(" Error accesing DB");
    //         process.exit(1);
    //     }
        
    //     if(graduationRates.length == 0){
    //         console.log("Empty DB");
    //         db.insert(initialGraduationRates);
    //     }else{
    //         console.log("DB initialized with "+graduationRates.length+" graduation-ates");
    //     }
        
    // });
    res.sendStatus(200);
});*/

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
        //Comprobamos si hay incongruencias en los datos antes de actuar
        if (data.length > 5 || !data.hasOwnProperty("province") || !data.hasOwnProperty("year")  ||
            !data.hasOwnProperty("public-school") || !data.hasOwnProperty("private-school") || !data.hasOwnProperty("charter-school"))
            {
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
        var province = req.params.province;
        console.log(Date() + " - GET /graduation-rates/" + province);
        db.find({ "province": province }).toArray((err, datas) => {
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
                delete c._id; 
                return c;
            }));
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

        //Comprobamos si hay incongruencias en los datos antes de actuar
        if (province != data.province || data.length > 5 ||  !data.hasOwnProperty("province") || !data.hasOwnProperty("year")  ||
            !data.hasOwnProperty("public-school") || !data.hasOwnProperty("private-school") || !data.hasOwnProperty("charter-school"))
             {
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



//################### Fin API REST de Andrés:
