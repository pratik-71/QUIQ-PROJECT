const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    phone_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    bio:{
        type: String
    },
    country: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    profile_photo: {
        type:String
    },
    cover_photo: {
        type: String, 
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
