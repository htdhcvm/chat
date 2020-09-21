const mongoose = require("mongoose");


const User = new mongoose.Schema({
    _id : Number,
    name : String,
    photo : String,
    active : {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("User", User);
