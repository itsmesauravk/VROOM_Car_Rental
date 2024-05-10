const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    senderUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverDistributor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Distributor",
        required:true
    },
    bookingDetails:{
        type:Object,
        required:true
    },
    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cars",
        default:null
    },
    status:{
        type:String,
        default:"Pending"
    }
},
timestamps = true
)


module.exports = mongoose.model("Request",RequestSchema)