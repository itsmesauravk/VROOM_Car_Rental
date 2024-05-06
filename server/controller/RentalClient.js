const Cars = require('../schema/AddCar');
const multer = require('multer');
const path = require('path');
const express = require('express'); 
const app = express(); 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/rentalClients');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: false }));

//middleware for adding more then 1 photos
const addNewClientMiddleware = upload.fields([{ name: 'carPhoto', maxCount: 1 }, { name: 'documentPhoto', maxCount: 1 }]);
// Adding a new car
const addNewClient = async (req, res) => {
    try {
        const { ownerName, ownerPhone, carBrand, carType, carNumber, driverName, driverPhone,distributorId } = req.body;
        const carPhoto = req.files['carPhoto'][0].path; // Get path of car photo
        const documentPhoto = req.files['documentPhoto'][0].path; // Get path of document photo
    
        const car = new Cars({
            ownerName,
            ownerPhone,
            carBrand,
            carType,
            carPhoto,
            carNumber,
            driverName,
            driverPhone,
            documentPhoto,
            distributorId
        });
        await car.save();
        res.status(201).json({ success: true, message: 'Car added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



// Get all car details
const getCarsDetails = async (req, res) => {
  try {
    const distributerId = req.params.id;
    // console.log(distributerId)
    const cars = await Cars.find({distributorId:distributerId});
    if(cars.length === 0){
      return res.status(404).json({ success: false, message: 'No cars found' });
    }
    res.status(200).json({ success: true, cars });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

//get car details according to location
const getSpecificCarRentals = async(req,res) => {
  try {
    const kathmandu = await Cars.find({})
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
    addNewClient,
    addNewClientMiddleware,
    getCarsDetails 
};
