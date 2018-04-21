const { getDb } = require('../database/bootstrap.database');

function checkDb(){
    return (req, res, next) => {
        getDb()
            .then(db => {
                req.db = db;
                next();
            })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = checkDb;