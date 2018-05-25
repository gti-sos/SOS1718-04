exports.config= {
    seleniumAddress: 'http://localhost:8910',
    specs:['t00-GraduationRatesApi.js','t01-loadDataGraduationRates.js','t02-addStadisticGraduationRates.js','t00-UnemploymentRatesApi.js','t01-loadDataUnemploymentRates.js','t02-addUnemploymentRates.js','t01-loadDataMedicalAttentionRates.js','t02-addMedicalAttentionRates.js'],
    capabilities :{
        'browserName': 'phantomjs'
    },
    params:{
        host:'localhost',
        port:'8080'
    }
    
}

exports.getAppUrl = function (){
    return "http://"+browser.params.host+":"+brower.params.port;
}