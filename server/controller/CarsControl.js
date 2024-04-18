const Cars = require('../schema/AddCar');
const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: false }));

// Adding a new car
app.post('/add-car', upload.single('carPhoto'), async (req, res) => {
  try {
    const { ownerName, ownerPhone, carBrand, carType, carNumber, driverName, driverPhone } = req.body;
    const carPhoto = req.file.path; 

    const car = new Cars({
      ownerName,
      ownerPhone,
      carBrand,
      carType,
      carPhoto,
      carNumber,
      driverName,
      driverPhone,
    });
    await car.save();
    res.status(201).json({ success: true, message: 'Car added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/get-cars', async (req, res) => {
  try {
    const cars = await Cars.find({});
    if(cars.length === 0){
      return res.status(404).json({ success: false, message: 'No cars found' });
    }
    res.status(200).json({ success: true, cars });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = app;
