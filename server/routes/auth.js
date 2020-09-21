const router = require("express").Router();
const AuthController = require("../controllers/auth");
const passportService = require("../services/Passport")



router.get("/google", AuthController.google);


router.get("/google/callback", AuthController.googleCallback);







router.get("/github", AuthController.github)

router.get("/github/callback", AuthController.githubCallback);




router.get("/success", AuthController.success);


router.get("/fail", AuthController.fail);


router.get("/checkAuth", AuthController.checkAuth);

router.get("/logout", AuthController.logout);


module.exports = router;
