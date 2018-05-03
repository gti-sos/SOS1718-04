var fs= require("fs")
var path = require("path")
describe('Add Stadistic', function(){
    it('should add a new stadistic',function(){
        browser
            .get('https://sos1718-04.herokuapp.com/RoRoMonApp.html#!/graduation-rates')
            .then(function(){
                element
                .all(by.repeater('stadistic in stadistics'))
                .then(function(initialStadistics){
                    browser.driver.sleep(2000);
                    
                    element(by.model('newStadistic.province')).sendKeys('huelva');
                    console.log("province")
                    element(by.model('newStadistic.year')).sendKeys(parseInt(2018));
                     console.log("year") 
                    element(by.model('newStadistic['+"'public-school'"+']')).sendKeys(parseFloat(76.0));
                     console.log("public")
                    element(by.model('newStadistic['+"'private-school'"+']')).sendKeys(parseFloat(89.0));
                    console.log("private")
                    element(by.model('newStadistic['+"'charter-school'"+']')).sendKeys(parseFloat(87.0));
                    console.log("charter")
                    element(by.buttonText('Add')).click().then(function(){
                        element.all(by.repeater('stadistic in stadistics')).then(function(stadistics){
                             browser.driver.sleep(2000)
                              browser.driver.sleep(2000)
                               browser.driver.sleep(2000)
                            browser.takeScreenshot()
                            .then(function(png){
                                var stream = fs.createWriteStream
                                    (path.join(process.cwd(),'test/output','t02-addStadisticGraduationRates.png'));
                                    stream.write(new Buffer(png,'base64'));
                                    stream.end();
                    }).then(expect(stadistics.length).toEqual(initialStadistics.length+1));
                        });
                    });

                    
                    
                   
                });
            });
        
    });
});