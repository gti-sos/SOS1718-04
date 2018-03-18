var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var path = require("path");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";

// var dbFileName = __dirname+"/unemployment-rates.db";

var app = express();

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname+"/public")));

//Debería ir pero no entiendo por que no funciona
app.get(BASE_API_PATH+"/unemployment-rates/help",(res,req)=>{
    return res.redirect('https://documenter.getpostman.com/view/3896692/sos1718-04-unemployment-rates-v1/RVnZgdXZ');
});

//################### Inicio API REST de Cristian:

var initialUnemploymentRates = [
        { 
            "province" : "sevilla",
            "year" : 1981,
            "illiterate" : 3.7,
            "first-grade" : 5.1,
            "second-grade" : 24.9,
            "third-degree" : 0.1,
            "min-age" : 16,
            "max-age" : 19
        }, 
        { 
            "province" : "malaga",
            "year" : 1981,
            "illiterate" : 2.5,
            "first-grade" : 3.0,
            "second-grade" : 16.9,
            "third-degree" : 0.1,
            "min-age" : 16,
            "max-age" : 19
        },
         { 
            "province" : "cadiz",
            "year" : 1981,
            "illiterate" : 2.7,
            "first-grade" : 4.3,
            "second-grade" : 13.4,
            "third-degree" : 0.0,
            "min-age" : 16,
            "max-age" : 19
        },
         { 
            "province" : "almeria",
            "year" : 1981,
            "illiterate" : 0.5,
            "first-grade" : 0.8,
            "second-grade" : 3.3,
            "third-degree" : 0,
            "min-age" : 16,
            "max-age" : 19
        },
         { 
            "province" : "cordoba",
            "year" : 1981,
            "illiterate" : 1.7,
            "first-grade" : 2.7,
            "second-grade" : 11.9,
            "third-degree" : 0,
            "min-age" : 16,
            "max-age" : 19
        },
    ];

// Descomentar en caso de hacer persistencia
// var db = new DataStore({
//     filename: dbFileName,
//     autoload: true
// });

// db.find({},(err,unemploymentRates)=>{
//     if(err){
//         console.error(" Error accesing DB");
//         process.exit(1);
//     }
    
//     if(unemploymentRates.length == 0){
//         console.log("Empty DB");
//         db.insert(initialUnemploymentRates);
//     }else{
//         console.log("DB initialized with "+unemploymentRates.length+" unemployment-rates");
//     }
    
// });

app.get(BASE_API_PATH+"/unemployment-rates/loadInitialData",(req,res)=>{
    console.log(Date() + " - GET /unemployment-rates/loadInitialData");
    if(initialUnemploymentRates.length == 0){
        initialUnemploymentRates = [
        { 
            "province" : "sevilla",
            "year" : 1981,
            "illiterate" : 3.7,
            "first-grade" : 5.1,
            "second-grade" : 24.9,
            "third-degree" : 0.1,
            "min-age" : 16,
            "max-age" : 19
        }, 
        { 
            "province" : "malaga",
            "year" : 1981,
            "illiterate" : 2.5,
            "first-grade" : 3.0,
            "second-grade" : 16.9,
            "third-degree" : 0.1,
            "min-age" : 16,
            "max-age" : 19
        },
         { 
            "province" : "cadiz",
            "year" : 1981,
            "illiterate" : 2.7,
            "first-grade" : 4.3,
            "second-grade" : 13.4,
            "third-degree" : 0.0,
            "min-age" : 16,
            "max-age" : 19
        },
         { 
            "province" : "almeria",
            "year" : 1981,
            "illiterate" : 0.5,
            "first-grade" : 0.8,
            "second-grade" : 3.3,
            "third-degree" : 0,
            "min-age" : 16,
            "max-age" : 19
        },
         { 
            "province" : "cordoba",
            "year" : 1981,
            "illiterate" : 1.7,
            "first-grade" : 2.7,
            "second-grade" : 11.9,
            "third-degree" : 0,
            "min-age" : 16,
            "max-age" : 19
        },
        ];
    }
    //Inicializamos los datos en caso de necesitarlo
    // db.find({},(err,unemploymentRates)=>{
    //     if(err){
    //         console.error(" Error accesing DB");
    //         process.exit(1);
    //     }
        
    //     if(unemploymentRates.length == 0){
    //         console.log("Empty DB");
    //         db.insert(initialUnemploymentRates);
    //     }else{
    //         console.log("DB initialized with "+unemploymentRates.length+" unemployment-rates");
    //     }
        
    // });
    res.sendStatus(200);
});

app.get(BASE_API_PATH+"/unemployment-rates",(req,res)=>{
    console.log(Date() + " - GET /unemployment-rates");
//     db.find({},(err,unemploymentRates)=>{
//      if(err){
//          console.error(" Error accesing DB");
//          res.sendStatus(500);
//          return;
//     }
//     res.send(unemploymentRates);
// });
    res.send(initialUnemploymentRates);
});

app.post(BASE_API_PATH+"/unemployment-rates",(req,res)=>{
    console.log(Date() + " - POST /unemployment-rates");
    var data = req.body;
    initialUnemploymentRates.push(data);
    res.sendStatus(201);
});

//Al hacer un put a un recurso no concreto envía un código de error
app.put(BASE_API_PATH+"/unemployment-rates",(req,res)=>{
    console.log(Date() + " - PUT /unemployment-rates");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/unemployment-rates",(req,res)=>{
    console.log(Date() + " - DELETE /unemployment-rates");
    initialUnemploymentRates = [];
    
    //db.remove({});
    
    res.sendStatus(200);
});

//Recursos concretos
app.get(BASE_API_PATH+"/unemployment-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - GET /unemployment-rates/"+province);
    res.send(initialUnemploymentRates.filter((c)=>{
        return (c.province == province);
    })[0]);
});

app.delete(BASE_API_PATH+"/unemployment-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - DELETE /unemployment-rates/"+province);
    initialUnemploymentRates = initialUnemploymentRates.filter((c)=>{
        return (c.province != province);
    });
    res.sendStatus(200);
});

app.post(BASE_API_PATH+"/unemployment-rates/:province",(req,res)=>{
    var province = req.params.province;
    console.log(Date() + " - POST /unemployment-rates/"+province);
    res.sendStatus(405);
});

app.put(BASE_API_PATH+"/unemployment-rates/:province",(req,res)=>{
    var province = req.params.province;
    var data = req.body;
    console.log(Date() + " - PUT /unemployment-rates/"+province);
    
    //db.update({"name":contact.name},contact,(err,numUpdate)=>{
    //    console.log("Update: "+numUpdate);
    //});
    //Comprobamos si hay incongruencias en los datos antes de actuar
    if(province != data.province){
        res.sendStatus(409);
        return;
    }
    
    initialUnemploymentRates = initialUnemploymentRates.map((c)=>{
        console.log("entra");
        if(c.province == data.province){
            res.sendStatus(200);
            return data;
        }else{
            res.sendStatus(200);
            return c;
        }
    });
});


//################### Fin API REST de Cristian:


app.listen(port, ()=>{
    console.log("Server ready on port "+port+"!");
}).on("error", (e)=>{
    console.log("Server NOT READY: "+e);
});
