module.exports = {
    login: (req, res) => {
        const db = app.get('db');
        const {username, password} = req.body;
        
        db.users.findOne({username, password})
            .then( user => {
                if (!user){
                    return res.status(401).send({success: false, message: 'Login failed'})
                }
                req.session.user = user.id;
                res.status(200).send({success: true, message: `Login Successful!`})
                })
        },
    register: (req, res) => {
        const db = app.get('db');
        const { username, password, address, city, state, zip } = req.body;
            
    db.user.createUser({ 
        username: req.body.username, 
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
         
    })
            .then(user => {
                req.session.user = users.id;
                console.log(req.session.user)
                res.status(200).send({ success: true, message: 'logged in successfully' });
            })
            .catch(handleDbError(res));
        }
    
}