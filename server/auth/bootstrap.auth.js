const passport = require('passport');

const { getDb } = require('../database/bootstrap.database');

passport.serializeUser((user, done) => {
    if (!user) {
        done('No user');
    }
    
    done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
    getDb()
        .then(db => {
            db.user_table.findOne({ user_id: id })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    
                    delete user.password;
                    
                    done(null, user);
                })
                .catch(err => done(err));
        })
        .catch(err => done(Error('Internal Server Error')));
});

module.exports = passport;