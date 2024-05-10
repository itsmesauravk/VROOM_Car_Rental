const mongoose = require('mongoose');

const AddCarSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    ownerPhone: {
        type: String,
        required: true
    },
    carBrand: {
        type: String,
        required: true
    },
    carType: {
        type: String,
        required: true
    },
    carPhoto: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    driverPhone: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    documentPhoto:{
        type: String,
        require: true
    },
    distributorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Distributor",
        required:true
    },
    status:{
        type:String,
        default:"Available"
    }
},
{ timestamps: true }
);

const Cars = mongoose.model('Cars', AddCarSchema);
module.exports = Cars;