
var express = require("express");
var path = require("path");

var app = express();
var port = ( process.env.PORT || 16778 );

app.use("/", express.static(path.join(__dirname+"/public")));

app.use("/",express.static(__dirname+"/public"));

app.get("/hello",(req,res)=>{
    res.send("Hello world!");
});

app.listen(port, ()=>{
    console.log("Server ready on port "+port+"!");
}).on("error", (e)=>{
    console.log("Server NOT READY: "+e);
});

