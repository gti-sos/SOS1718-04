var newman= require("newman")
var path = require("path")
var config = require('./config');

describe('API should work', function(){
    newman.run({
        collection: require(path.join(process.cwd(),"test","collection.postman_collection.json")),
        reporters: "cli"
        }, function(err){
            if(err)
                throw err;
            else
                console.log("Collection run complete!");
        });
    
});