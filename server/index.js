// Sun March 31 2024 23:45 

const express = require('express');
const app = express();

const cors = require('cors')
const cookieParser = require('cookie-parser')


require('dotenv').config();

const routes = require("./router/route")
const car = require('./controller/CarsControl')

const path = require('path')


//middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: false }));


app.use('/',routes)
app.use('/',car )


//database
const db = require('./connectDB')

//server port
const port = process.env.PORT || 4000;


//routes
app.get('/', (req, res) => {
    res.send('Hello World!');
    });


//server listning
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    })