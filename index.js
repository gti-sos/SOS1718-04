<<<<<<< HEAD
=======
<<<<<<< HEAD

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
=======

>>>>>>> dd1f498deae1e9639f7114ae03b2e8f211c4e432
var express = require("express");
var path = require("path");

var app = express();
var port = ( process.env.PORT || 16778 );

app.use("/", express.static(path.join(__dirname+"/public")));

app.get("/hello",(req,res)=>{
    res.send("Hello world!");
});

app.listen(port, ()=>{
    console.log("Server ready on port "+port+"!");
}).on("error", (e)=>{
    console.log("Server NOT READY: "+e);
<<<<<<< HEAD
});
=======
});

>>>>>>> 8d23bd72458bd456c085bb7c4cd99f148b576087
>>>>>>> dd1f498deae1e9639f7114ae03b2e8f211c4e432
