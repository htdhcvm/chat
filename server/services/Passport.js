require('dotenv').config();
const passport = require("passport");
const User = require('../model/User');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const UserModel = require("../model/User");
const Scheduler = require("../Scheduler");


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
        const _id = profile.id;
        const currentUser =  await UserModel.findOne({ _id : _id}).exec();

        if(!currentUser) {
            const { sub, name, picture } = profile._json;
            
            const newUser = await new UserModel({
                _id : sub,
                name : name,
                photo : picture
            }).save();

            return cb(null, newUser);
        } 
        return cb(null, currentUser)
    }
));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const _id = profile.id;

        const currentUser =  await UserModel.findOne({ _id : _id}).exec();
        if(!currentUser) {
            const { id, login, avatar_url } = profile._json;
            const newUser = await new UserModel({
                _id : id,
                name : login,
                photo : avatar_url
            }).save();

            return done(null, newUser);
        } 
        return done(null, currentUser)
    }
));





passport.serializeUser( (user, done) => {
    done(null, user._id);
})

passport.deserializeUser( (_id, done) => {
    UserModel.findOne({ _id : _id})
        .then(user => {
            done(null, user)
        }).catch(e => {
            done(new Error("Failed deserialize user"))
        })
})