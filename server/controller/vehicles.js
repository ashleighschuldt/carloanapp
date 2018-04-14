module.exports = {
    getVehicles: (req, res) => {
        const db = req.app.get('db');
        db.vehicles.getVehiclesByUser({ userId: req.session.user })
            .then(vehicles => {
                res.status(200).send(vehicles);
            })
            .catch(err => {
                console.log(err)});
    }
}