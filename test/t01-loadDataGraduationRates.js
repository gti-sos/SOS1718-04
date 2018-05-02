var fs= require("fs")
var path = require("path")
describe('Data is Loaded', function(){
    it('should show some conctacs',function(){
        browser
            .get('https://sos171804arg-sandbox2-sos171804arg.c9users.io/RoRoMonApp.html#!/graduationRates')
            .then(function(){
                element
                .all(by.repeater('stadistic in stadistics'))
                .then(function(stadistics){
                    browser.takeScreenshot()
                    .then(function(png){
                        var stream = fs.createWriteStream
                            (path.join(process.cwd(),'test','t01-graduationRates.png'));
                        stream.write(new Buffer(png,'base64'));
                        stream.end();
                    });
                    expect(stadistics.length).toBeGreaterThan(0);
                });
            })
        
    })
});