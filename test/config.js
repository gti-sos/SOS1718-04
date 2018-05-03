exports.config= {
    seleniumAddress: 'http://localhost:8910',
    specs:['t01-loadDataGraduationRates.js','t02-addStadisticGraduationRates.js'],
    capabilities :{
        'browserName': 'phantomjs'
    }
}