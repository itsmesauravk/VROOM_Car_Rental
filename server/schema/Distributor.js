const mongoose = require('mongoose')

const DistributorSchema = new mongoose.Schema({
    profilePicture:{
        type:String,
        default:"https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
    },
    fullname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    distributionLocation:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"distributor"
    }
},
timestamps = true
)

const Distributor = mongoose.model("Distributor",DistributorSchema)
module.exports = Distributor