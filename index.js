
var express = require ("express");
var app  = express();
var port = (process.env.PORT || 1607);


app.use("/", express.static(__dirname+"/public"))


app.listen(port,()=>{
    console.log("server ready on port " + port + "!");
}).on("error",(e)=>{
    console.log("SERVER NOT READY: "+e);
});

console.log("server setting up... ");
