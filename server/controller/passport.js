module.exports = {
    serializeUser: (user, done ) => {
        done(null, {clientID: user.id, email: user._json.email, name: user._json.name})
    },
    deserializeUser: (obj, done) => {
        done(null, obj)
    }
}