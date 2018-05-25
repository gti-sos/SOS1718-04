var newman= require("newman");
var path = require("path");

describe('Unemployment api works', function(){
    newman.run({
        collection: require(path.join(process.cwd(),"test","Pruebas_automaticas_postman_unemployment.json")),//cwd ruta del proceso donde se este ejecutando node
        reporters:"cli"
    }, function(err){
        if(err)
            throw err;
        else
            console.log("collection run complete")
    });
});