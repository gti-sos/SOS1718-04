var express = require("express")
var cool = require("cool-ascii-faces"); //nos permite invocarla como función
var app = express();

app.use("/",express.static(__dirname+"/public"));

app.get("/hello",(req,res)=>{
    
    res.send("hello!");
});

app.listen(process.env.PORT);
//console.log("Hello world!");
console.log(cool())