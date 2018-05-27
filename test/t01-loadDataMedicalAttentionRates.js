var fs= require("fs")
var path = require("path")
var config = require('./config');

describe('Data is Loaded', function(){
    it('should show some medical attention  rates',function(){
        browser
            .get('https://sos1718-04.herokuapp.com/RoRoMonApp.html#!/medical-attention-rates')
            .then(function(){
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                
                element
                .all(by.repeater("medicalAttentionRate in medicalAttentionRates"))
                .then(function(medicalAttentionRates){
                    
                    browser.takeScreenshot()
                    .then(function(png){
                        var stream = fs.createWriteStream
                            (path.join(process.cwd(),'test/output','t01-medicalAttentionRates.png'));
                        stream.write(new Buffer(png,'base64'));
                        stream.end();
                    })
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                browser.driver.sleep(2000);
                expect(medicalAttentionRates.length).toBeGreaterThan(0);
                  console.log(medicalAttentionRates.length)
                    
                });
            })
        
    })
});