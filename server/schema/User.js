const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
    },
    role:{
        type:String,
        default:"user"
    }
},
timestamps = true
)

const User = mongoose.model("User",UserSchema)

module.exports = User