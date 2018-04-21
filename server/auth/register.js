const bcrypt = require('bcrypt');


module.exports = {
    register: (req, res) => {
        const db = req.app.get('db');
        const { username, password, address, city, state, zip } = req.body;

        if (!username || !password || !address || !city || !state || !zip){
            return res.status(400).send("All fields are required.");
        }
        const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(15))
    
        db.user.createUser({ 
            username: username, 
            password: encryptedPassword,
            address: address,
            city: city,
            state: state,
            zip: zip
             
        })
        .then(([user]) => {
           res.status(200).send("Registration successful") 
        })
        .catch(err => {
            console.log(err)
        });
    }
}