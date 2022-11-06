const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const jwtStrategy = require('passport-jwt').Strategy;
require('dotenv').config();

passport.use('jwt',new jwtStrategy(
    {
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:process.env.JWT_SECRET
    },
    (payload,done) => {
        done(null, payload.user);
    }
))
