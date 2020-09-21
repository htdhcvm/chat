const router = require("express").Router();
const UserController = require("../controllers/user");
const UserModel = require("../model/User");

router.post("/getAllNotCurrent", async (req, res) => {
    const findUsers = await UserModel.find({ _id : { $ne : req.user._id}});
    res.send(findUsers);
});


module.exports = router;
