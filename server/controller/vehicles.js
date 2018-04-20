module.exports = {
    getVehicles: (req, res) => {
        const db = req.app.get('db');
        db.vehicles.getVehiclesByUser({ userId: req.session.user })
            .then(vehicles => {
                res.status(200).send(vehicles);
            })
            .catch(err => {
                console.log(err)});
    },
    getVehicle: (req, res) => {
        const db = req.app.get('db');
        db.vehicles.getVehicleById({ id: req.params.id })
            .then(vehicle => {
                res.status(200).send(vehicle);
            })
            .catch(err => {
                console.log(err)
            })
    },
    addVehicle: (req, res) => {
        const db = req.app.get('db');
        db.vehicles.addVehicle({ 
            userId: req.session.user,
            name: req.body.name,
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            trim: req.body.trim,
            privateSaleValue: req.body.privateSaleValue,
            tradeInValue: req.body.tradeInValue,
            payoff: req.body.payoffValue,
             
        })
          .then(vehicles => {
              return db.vehicles.getVehiclesByUser({ userId: req.session.user })
          })  
          .then( vehicles => {
              res.status(200).send(vehicles);
          })
          .catch(err => {
              console.log(err)
          })
    },
    editVehicle: (req, res) => {
        const db = req.app.get('db');
        db.vehicles.editVehicle({
            userId: req.session.user,
            id: req.params.id,
            name: req.body.name,
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            trim: req.body.trim,
            privateSaleValue: Number(req.body.privateSaleValue),
            tradeInValue: Number(req.body.tradeInValue),
            payoff: Number(req.body.payoffValue),
        })
        .then(vehicles => {
            return db.vehicles.getVehiclesByUser ({ userId: req.session.user })
        })
        .then( vehicles => {
            res.status(200).send(vehicles)
        })
        .catch(err => {
            console.log(err)
        })
    },
    deleteVehicle: (req, res ) => {
        const db = req.app.get('db');
    db.vehicles.deleteVehicle({ vehicleId: req.params.id })
        .then(vehicles => {
            return db.vehicles.getVehiclesByUser({ userId: req.session.user })
        })
        .then( vehicles => {
            res.status(200).send(vehicles)
        })
        .catch( err => {
            console.log(err);
        })        
    }
}