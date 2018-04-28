const axios = require('axios');

module.exports = {
    getLoans: (req, res) => {
        const db = req.app.get('db');
        db.loans.getLoansByUser({ userId: req.user.id })
            .then(loans => {
                res.status(200).send(loans);
            })
            .catch(err => {
                console.log(err)});
    },
    getTax: (req, res) => {
        const db = req.app.get('db');
        db.loans.getAddress({ userId: req.user.id })
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
    },
    addLoan: (req, res ) => {
        const db = req.app.get('db');
        db.loans.addLoan({ 
            userId: req.user.id,
            name: req.body.name,
            purchasePrice: req.body.purchasePrice,
            cashDown: req.body.cashDown,
            tradeInValue: req.body.tradeInValue,
            payoff: req.body.payoff,
            privateSale: req.body.payoff,
            loanAmount: req.body.loanAmount,
            interest: req.body.interest,
            payments: req.body.payments,
            monthly: req.body.monthly,
            taxRate: req.body.taxRate
        })
        .then(loans => {
            return db.loans.getLoansByUser({ userId: req.user.id })
        })
        .then(loans => {
            res.status(200).send(loans);
        })
        .catch(err => {
            console.log(err)
        })
    },
    deleteLoan: (req, res ) => {
        const db = req.app.get('db');
    db.loans.deleteLoan({ loanId: req.params.id })
        .then(loans => {
            return db.loans.getLoansByUser({ userId: req.user.id })
        })
        .then( loans => {
            res.status(200).send(loans)
        })
        .catch( err => {
            console.log(err);
        })        
    }
}