var unemploymentRates = {};
var BASE_API_PATH = "/api/v1";

module.exports = unemploymentRates;

unemploymentRates.register = function(app, db) {
    
    console.log("Registering routes for contacts API...");
    
    //Debería ir pero no entiendo por que no funciona
    app.get(BASE_API_PATH + "/unemployment-rates/help", (res, req) => {
        return res.redirect('https://documenter.getpostman.com/view/3896692/sos1718-04-unemployment-rates-v1/RVnZgdXZ');
    });

    //################### Inicio API REST de Cristian:

    

    // Descomentar en caso de hacer persistencia
    // var db = new DataStore({
    //     filename: dbFileName,
    //     autoload: true
    // });

    // db.find({},(err,unemploymentRates)=>{
    //     if(err){
    //         console.error(" Error accesing DB");
    //         process.exit(1);
    //     }

    //     if(unemploymentRates.length == 0){
    //         console.log("Empty DB");
    //         db.insert(initialUnemploymentRates);
    //     }else{
    //         console.log("DB initialized with "+unemploymentRates.length+" unemployment-rates");
    //     }

    // });

    app.get(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - GET /unemployment-rates");
            db.find({}).toArray((err,unemploymentRates)=>{
             if(err){
                 console.error(" Error accesing DB");
                 res.sendStatus(500);
                 return;
            }
            res.send(unemploymentRates.map((c)=>{
                delete c._id; //Quitamos el campo id
                return c;
            }));
        });
    });

    app.post(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - POST /unemployment-rates");
        var data = req.body;
        initialUnemploymentRates.push(data);
        res.sendStatus(201);
    });

    //Al hacer un put a un recurso no concreto envía un código de error
    app.put(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - PUT /unemployment-rates");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/unemployment-rates", (req, res) => {
        console.log(Date() + " - DELETE /unemployment-rates");
        initialUnemploymentRates = [];

        db.remove({});

        res.sendStatus(200);
    });

    //Recursos concretos
    app.get(BASE_API_PATH + "/unemployment-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /unemployment-rates/" + province);
        res.send(initialUnemploymentRates.filter((c) => {
            return (c.province == province);
        })[0]);
    });

    app.delete(BASE_API_PATH + "/unemployment-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /unemployment-rates/" + province);
        initialUnemploymentRates = initialUnemploymentRates.filter((c) => {
            return (c.province != province);
        });
        res.sendStatus(200);
    });

    app.post(BASE_API_PATH + "/unemployment-rates/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST /unemployment-rates/" + province);
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/unemployment-rates/:province", (req, res) => {
        var province = req.params.province;
        var data = req.body;
        console.log(Date() + " - PUT /unemployment-rates/" + province);

        //db.update({"name":contact.name},contact,(err,numUpdate)=>{
        //    console.log("Update: "+numUpdate);
        //});
        //Comprobamos si hay incongruencias en los datos antes de actuar
        if (province != data.province) {
            res.sendStatus(409);
            return;
        }

        initialUnemploymentRates = initialUnemploymentRates.map((c) => {
            console.log("entra");
            if (c.province == data.province) {
                //res.sendStatus(200);
                return data;
            }
            else {
                //res.sendStatus(200);
                return c;
            }
        });
        res.sendStatus(200);
    });

}
//################### Fin API REST de Cristian:
