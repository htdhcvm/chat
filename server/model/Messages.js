const mongoose = require("mongoose");

const Messages = new mongoose.Schema({
    room : String,
    currentUser : String,
    text : String,
    photo : String
});

module.exports = mongoose.model("Messages", Messages);
