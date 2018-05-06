var fs= require("fs")
var path = require("path")
describe('Data is Loaded', function(){
    it('should show some unemployment rates',function(){
        browser
            .get('https://sos1718-04.herokuapp.com/RoRoMonApp.html#!/unemployment-rates')
            .then(function(){
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                
                element
                .all(by.repeater("unemploymentRate in unemploymentRates"))
                .then(function(unemploymentRates){
                    
                    browser.takeScreenshot()
                    .then(function(png){
                        var stream = fs.createWriteStream
                            (path.join(process.cwd(),'test/output','t01-unemploymentRates.png'));
                        stream.write(new Buffer(png,'base64'));
                        stream.end();
                    })
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                expect(unemploymentRates.length).toBeGreaterThan(0);
                  console.log(unemploymentRates.length)
                    
                });
            })
        
    })
});