const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    address:String,
    age: Number,
    contactno:String,
    School: String,
    College: String,
    Course:String,



})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;