const User = require('../schema/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



//user register (signup)

const registration = async (req, res) => {
    try {
      const { fullname, email, phone, password, address } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
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
        password:hashedPassword, 
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



  //user login
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email exists
      const user = await User.findOne({ email});
      if(!user){
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      //verify password
      const isMatch = bcrypt.compareSync(password, user.password);
      if(!isMatch){
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      res.status(200).json({ success: true, message: 'User logged in successfully', token });


    }catch(error){
      console.error('Error logging in user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }

  }






  module.exports = {
    registration,
    login
  }