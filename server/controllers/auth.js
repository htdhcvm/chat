const passport = require("passport");
const UserModel = require("../model/User");
const Scheduler = require("../Scheduler");

class Auth {

    google(req, res, next) {
        passport.authenticate("google", { scope: ['profile'] })(req, res, next);
    }

    googleCallback(req, res, next) {
        passport.authenticate("google", {
            successRedirect : "/auth/success",
            failureRedirect : "/auth/fail"
        })(req, res, next);
    }

    github(req, res, next) {
        passport.authenticate("github", { scope: ['user:email'] })(req, res, next);
    }

    githubCallback(req, res, next){
        passport.authenticate("github", {
            successRedirect : "/auth/success",
            failureRedirect : "/auth/fail"
        })(req, res, next);
    }




    async success(req, res) {
        await UserModel.updateOne({ _id : req.user._id}, {active : true})
        Scheduler.updateUserStatus(req.user._id, 1000 * 60 * 60);
        res.redirect("http://127.0.0.1:3000/");
    }




    fail(req, res) {
        res.send("fail");
    }

    checkAuth(req, res){
        if(req.user) return res.json({
            success : true,
            user : {
                id : req.user._id,
                name: req.user.name,
                photo : req.user.photo
            }
        })

        return res.json({
            success : false
        })
    }

    async logout(req, res) {
        await UserModel.updateOne({ _id : req.user._id}, {active : false});
        req.logout();
        res.redirect("http://127.0.0.1:3000/");
    }

}


module.exports = new Auth();