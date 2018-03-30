var medicalAttentionAccordingtoTypeRatesApi = {};
var BASE_API_PATH = "/api/v1";
module.exports = medicalAttentionAccordingtoTypeRatesApi;

medicalAttentionAccordingtoTypeRatesApi.register = function(app, db) {
    console.log("Registering routes for contacts API...");
    app.get(BASE_API_PATH + "/help", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/359472/collection/RVnWhyva");//hay que cambiar esto a mi link
    });


    app.get(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
        console.log(Date() + " - GET /medical-attention-according-to-type-rates");
        //     db.find({},(err,MedicalAttentionAccordingtoTypeRates)=>{
        //      if(err){
        //          console.error(" Error accesing DB");
        //          res.sendStatus(500);
        //          return;
        //     }
        //     res.send(MedicalAttentionAccordingtoTypeRates);
        // });
        res.send(initialMedicalAttentionAccordingtoTypeRates);
    });

    app.post(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
        console.log(Date() + " - POST /medical-attention-according-to-type-rates");
        var data = req.body;
        initialMedicalAttentionAccordingtoTypeRates.push(data);
        res.sendStatus(201);
    });


    //Al hacer un put a un recurso no concreto envía un código de error
    app.put(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
        console.log(Date() + " - PUT /medical-attention-according-to-type-rates");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/medical-attention-according-to-type-rates", (req, res) => {
        console.log(Date() + " - DELETE /medical-attention-according-to-type-rates");
        initialMedicalAttentionAccordingtoTypeRates = [];

        //db.remove({});

        res.sendStatus(200);
    });

    //Recursos concretos

    app.get(BASE_API_PATH + "/medical-attention-according-to-type-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /medical-attention-according-to-type-rates/" + province);
        res.send(initialMedicalAttentionAccordingtoTypeRates.filter((c) => {
            return (c.province == province);
        })[0]);
    });

    app.delete(BASE_API_PATH + "/medical-attention-according-to-type-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /medical-attention-according-to-type-rates/" + province);
        initialMedicalAttentionAccordingtoTypeRates = initialMedicalAttentionAccordingtoTypeRates.filter((c) => {
            return (c.province != province);
        });
        res.sendStatus(200);
    });

    app.post(BASE_API_PATH + "/medical-attention-according-to-type-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST /graduation-rates/" + province);
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/medical-attention-according-to-type-rates/:province", (req, res) => {
        var province = req.params.province;
        var data = req.body;
        console.log(Date() + " - PUT /medical-attention-according-to-type-rates/" + province);

        //db.update({"name":contact.name},contact,(err,numUpdate)=>{
        //    console.log("Update: "+numUpdate);
        //});
        //Comprobamos si hay incongruencias en los datos antes de actuar
        if (province != data.province) {
            res.sendStatus(409);
            return;
        }

        initialMedicalAttentionAccordingtoTypeRates = initialMedicalAttentionAccordingtoTypeRates.map((c) => {
            console.log("entra");
            if (c.province == data.province) {
                res.sendStatus(200);
                return data;
            }
            else {
                res.sendStatus(200);
                return c;
            }
        });
    });



}
