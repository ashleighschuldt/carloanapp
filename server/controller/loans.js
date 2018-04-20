const axios = require('axios');

module.exports = {
    getLoans: (req, res) => {
        const db = req.app.get('db');
        db.loans.getLoansByUser({ userId: req.session.user })
            .then(loans => {
                res.status(200).send(loans);
            })
            .catch(err => {
                console.log(err)});
    },
    getTax: (req, res) => {
        const db = req.app.get('db');
        db.loans.getAddress({ userId: req.session.user })
        .then(address => {
          return  axios({
                url:`https://sandbox-rest.avatax.com/api/v2/taxrates/byaddress?line1=${address.address}&city=${address.city}&state=${address.state}&zip=${address.zip}`,
                method: 'get',
                headers: {'Authorization': 'Basic aHR0cHdhdGNoOmY='}
            })
        })
        .then( taxInfo => {
            res.send(taxInfo)
        })
        .catch(err => {
            console.log(err);
        })
    }
}