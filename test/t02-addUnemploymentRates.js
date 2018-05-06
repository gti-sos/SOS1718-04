var fs= require("fs")
var path = require("path")
describe('Add Stadistic', function(){
    it('should add a new unemployment rate',function(){
        browser
            .get('https://sos1718-04.herokuapp.com/RoRoMonApp.html#!/unemployment-rates')
            .then(function(){
                element
                .all(by.repeater("unemploymentRate in unemploymentRates"))
                .then(function(initialUnemploymentRates){
                    browser.driver.sleep(2000);
                    
                    element(by.model('newUnemploymentRate.province')).sendKeys('sevilla');
                    console.log("province")
                    element(by.model('newUnemploymentRate.year')).sendKeys(parseInt(2018));
                     console.log("year") 
                    element(by.model('newUnemploymentRate['+"'illiterate'"+']')).sendKeys(parseFloat(22.3));
                     console.log("illiterate")
                    element(by.model('newUnemploymentRate['+"'first-grade'"+']')).sendKeys(parseFloat(16.5));
                    console.log("first grade")
                    element(by.model('newUnemploymentRate['+"'second-grade'"+']')).sendKeys(parseFloat(14.3));
                    console.log("second grade")
                    element(by.model('newUnemploymentRate['+"'third-degree'"+']')).sendKeys(parseFloat(0.1));
                    console.log("third degree")
                    element(by.model('newUnemploymentRate['+"'min-age'"+']')).sendKeys(parseInt(20));
                    console.log("min age")
                    element(by.model('newUnemploymentRate['+"'max-age'"+']')).sendKeys(parseInt(25));
                    console.log("max age")
                    element(by.buttonText('Add')).click().then(function(){
                        element.all(by.repeater('unemploymentRate in unemploymentRates')).then(function(unemploymentRates){
                            console.log(unemploymentRates.length)
                             

                            browser.takeScreenshot()
                            .then(function(png){
                                var stream = fs.createWriteStream
                                    (path.join(process.cwd(),'test/output','t02-addUnemploymentRates.png'));
                                    stream.write(new Buffer(png,'base64'));
                                    stream.end();
                    });
                            expect(unemploymentRates.length).toEqual(initialUnemploymentRates.length+1);
                        });
                       
                    });

                    
                    
                   
                });
            });
        
    });
});