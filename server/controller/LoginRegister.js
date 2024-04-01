const User = require('../schema/User')


//user register (signup)

const registration = async (req, res) => {
    try {
      const { fullname, email, phone, password, address } = req.body;
  
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
  
      // Create a new user instance for user registration
      const newUser = new User({
        fullname,
        email,
        phone,
        password, 
        address,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };



  module.exports = {
    registration
  }