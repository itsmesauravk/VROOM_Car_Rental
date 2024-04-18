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
    }
},
{ timestamps: true }
);


module.exports = mongoose.model('Cars', AddCarSchema);