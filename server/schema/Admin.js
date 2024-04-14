const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
},
timestamps = true
)

const Admin = mongoose.model("Admin",AdminSchema)

module.exports = Admin