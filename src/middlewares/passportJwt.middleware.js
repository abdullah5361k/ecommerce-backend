const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require("../models/user.model")

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
}

const strategy = new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("JWT ", jwt_payload)
    User.findOne({ _id: jwt_payload.id })
        .then(res => {
            return done(null, res)
        })
        .catch(err => {
            console.log("EE ", err)
            return (null, false)
        })
});


module.exports = strategy