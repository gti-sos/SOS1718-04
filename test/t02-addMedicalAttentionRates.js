var fs = require("fs")
var path = require("path")
describe('Add Stadistic', function() {
    it('should add a new medical Attention Rate', function() {
        browser
            .get('https://sos1718-04.herokuapp.com/RoRoMonApp.html#!/medical-attention-rates')
            .then(function() {
                element
                    .all(by.repeater("medicalAttentionRate in medicalAttentionRates"))
                    .then(function(initialMedicalAttentionRates) {
                        browser.driver.sleep(2000);

                        element(by.model('newMedicalAttentionRate.province')).sendKeys('sevilla');
                        console.log("province")
                        element(by.model('newMedicalAttentionRate.year')).sendKeys(parseInt(2020));
                        console.log("year")
                        element(by.model('newMedicalAttentionRate[' + "'nursing'" + ']')).sendKeys(parseFloat(22.3));
                        console.log("nursing")
                        element(by.model('newMedicalAttentionRate[' + "'general-medicine'" + ']')).sendKeys(parseFloat(16.5));
                        console.log("general-medicine")
                        element(by.model('newMedicalAttentionRate[' + "'social-work'" + ']')).sendKeys(parseFloat(14.3));
                        console.log("social-work")
                     
                        element(by.buttonText('Add')).click().then(function() {
                            element.all(by.repeater('medicalAttentionRate in medicalAttentionRates')).then(function(medicalAttentionRates) {
                                console.log(medicalAttentionRates.length)


                                browser.takeScreenshot()
                                    .then(function(png) {
                                        var stream = fs.createWriteStream(path.join(process.cwd(), 'test/output', 't02-addMedicalAttentionRates.png'));
                                        stream.write(new Buffer(png, 'base64'));
                                        stream.end();
                                    });
                                expect(medicalAttentionRates.length).toEqual(initialMedicalAttentionRates.length + 1);
                            });

                        });




                    });
            });

    });
});
