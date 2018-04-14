module.exports = {
    login: (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        
        db.user_table.findOne({ username, password })
            .then( user => {
                if (!user){
                    return res.status(401).send({success: false, message: 'Login failed'})
                }
                req.session.user = user.id;
                res.status(200).send({success: true, message: `Login Successful!`})
                })
        },
    register: (req, res) => {
        const db = req.app.get('db');
        const { username, password, address, city, state, zip } = req.body;
            
    db.user.createUser({ 
        username: req.body.username, 
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
         
    })
            // .then( res => {
            //     return db.user.getUserbyusername({ username })
            // })
            .then(([user]) => {
                req.session.user = user.id;
                console.log(req.session.user)
                res.status(200).send({ success: true, message: 'logged in successfully' });
            })
            .catch(err => {
                console.log(err)
            });
        }
    
}