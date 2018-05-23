var newman= require("newman");
var path = require("path");

describe('Api works', function(){
    newman.run({
        collection: require(path.join(process.cwd(),"test","Pruebas_automaticas.postman_collection.json")),//cwd ruta del proceso donde se este ejecutando node
        reporters:"cli"
    }, function(err){
        if(err)
            throw err;
        else
            console.log("collection run complete")
    });
});