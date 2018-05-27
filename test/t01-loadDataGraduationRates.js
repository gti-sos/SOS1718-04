var fs= require("fs")
var path = require("path")
var config = require("./config")

describe('Data is Loaded', function(){
    it('should show some stats',function(){
        browser
            .get('https://sos1718-04.herokuapp.com/RoRoMonApp.html#!/graduation-rates')
            .then(function(){
                browser.driver.sleep(2000);
                 browser.driver.sleep(2000);
                  browser.driver.sleep(2000);
               
                
                element
                .all(by.repeater("stadistic in stadistics"))
                .then(function(stadistics){
                    
                    browser.takeScreenshot()
                    .then(function(png){
                        var stream = fs.createWriteStream
                            (path.join(process.cwd(),'test/output','t01-graduationRates.png'));
                        stream.write(new Buffer(png,'base64'));
                        stream.end();
                    })
                console.log("Cargando todos los datos GRADUATION RATES");
                expect(stadistics.length).toBeGreaterThan(0);
                    
                });
            })
        
    })
});