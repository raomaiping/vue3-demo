const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Create Schema
const ProfileSchema = new Schema({
    type: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
    },
    date:{
        type:Date,
        default:Date.now
    }, 
})





module.exports = Profile = mongoose.model("profile",ProfileSchema);