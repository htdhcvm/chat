const mongoose = require("mongoose");


const Room = new mongoose.Schema({
    name : String
});

module.exports = mongoose.model("Room", Room);
