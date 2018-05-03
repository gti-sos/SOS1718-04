exports.config= {
    seleniumAddress: 'https://sos1718-04.herokuapp.com/',
    specs:['t01-loadDataGraduationRates.js','t02-addStadisticGraduationRates.js'],
    capabilities :{
        'browserName': 'phantomjs'
    }
}