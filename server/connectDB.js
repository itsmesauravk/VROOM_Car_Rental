const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI)

// Verifying MongoDB connection
const db = mongoose.connection;
console.log("Connecting to database server, Please wait ...")
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

console.log(db.once)