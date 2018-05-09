const express =  require('express');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const vehicles = require('./server/controller/vehicles');
const loans = require('./server/controller/loans');
const LocalStrategy = require('passport-local').Strategy;
const bcrpyt = require('bcrypt');
const app = express();
const {register} = require('./server/auth/register');
const path = require('path');


require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    name: 'carLoanApp',
    secret: process.env.SESSION_SECRET,
    cookie: {
        expires: 5*24*60*60*1000
    }
}))



massive(process.env.CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance)
    console.log('db is running');
})
.catch(err => {
    console.warn('Failed to connect:');
    console.error(err);
});

const options = { passReqToCallback: true }

passport.use(new LocalStrategy(options, function (req, username, password, done) {
    const db = req.app.get('db');
    db.user_table.findOne({ username })
    .then( user => {
        //if db did not return a user send 401 unauthorized or if the password match the user send a 401 unauthorized.
        if (!user) { return done(null, false); }
        if (!bcrpyt.compareSync(password, user.password)){ return done(null, false); }
        
        // removing password from memory.
        delete user.password;
        return done(null, user);
        
    })
    .catch(err => {
        done(err);
    })
}))

passport.serializeUser((user, done) => {
    if (!user) {
        done('No user');
    }
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.user_table.findOne({ id: id })
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            
            delete user.password;
            
            done(null, user);
        })
        .catch(err => done(err));
});



app.use(passport.initialize());
app.use(passport.session());

//End Points
app.post(`/api/auth/login`, passport.authenticate('local'), (req, res) => res.send('success'));
app.post(`/api/auth/register`, register);
app.get('/logout', function(req, res){
    req.logout();
    res.sendStatus(200);
  });

app.get(`/api/vehicles`, vehicles.getVehicles);
app.post(`/api/vehicles`, vehicles.addVehicle);
app.delete(`/api/vehicles/:id`, vehicles.deleteVehicle);
app.put(`/api/vehicles/:id`, vehicles.editVehicle);
app.get(`/api/vehicles/:id`, vehicles.getVehicle);

app.get(`/api/loans`, loans.getLoans);
app.get(`/api/tax`, loans.getTax);
app.post(`/api/loan`, loans.addLoan);
app.delete(`/api/loan/:id`, loans.deleteLoan);

app.use(express.static(path.join(__dirname, './build')))
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('this port is awesome', port)
});