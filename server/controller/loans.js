module.exports = {
    getLoans: (req, res) => {
        const db = req.app.get('db');
        db.loans.getLoansByUser({ userId: req.session.user })
            .then(loans => {
                res.status(200).send(loans);
            })
            .catch(err => {
                console.log(err)});
    }
}