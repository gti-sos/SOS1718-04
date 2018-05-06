exports.config= {
    seleniumAddress: 'http://localhost:8910',
    specs:['t01-loadDataGraduationRates.js','t02-addStadisticGraduationRates.js','t01-loadDataUnemploymentRates.js','t02-addUnemploymentRates.js','t01-loadDataMedicalAttentionRates.js','t02-addMedicalAttentionRates.js'],
    capabilities :{
        'browserName': 'phantomjs'
    }
}