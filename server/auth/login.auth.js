const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function configureLogin(passport){
    const options = { passReqToCallback: true }

    passport.use('login', new LocalStrategy(options, function (req, username, password, done) {
        db.user_table.findOne({ username, password })
            .then( user => {
                //if db did not return a user send 401 unauthorized or if the password match the user send a 401 unauthorized.
                if (!user) { return done(null, false); }
                if (!bycrpyt.compareSync(password, user.password)){ return done(null, false); }
                    
                // removing password from memory.
                delete user.password;
                return done(null, user);

            })
            .catch(err => {
                done(err);
            })
    }))
    return passport;
} 

module.exports = configureLogin;