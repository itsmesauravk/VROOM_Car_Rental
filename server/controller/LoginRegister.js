const User = require('../schema/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')



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

  //password reset

  const resetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        
        const checkEmail = await User.findOne({ email});
        if(!checkEmail){
            return res.status(400).json({ success: false, message: 'Email does not exist' });
        }

        const token = jwt.sign({ email }, 'jwt_secret_key', { expiresIn: '1h' });
  
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sanjeetkazithapa@gmail.com',
          pass: 'zthh seqb uboc cdin'
        },
        connectionTimeout: 60000
      });
  
      const mailOptions = {
        from: 'sanjeetkazithapa@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`
  
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  };
  

  const newPassword = async (req, res) => {
    try {
        const { password,token } = req.body;
        // const { token } = req.params;

        // Verify and decode the JWT token
        let decodedEmail;
        try {
            decodedEmail = jwt.verify(token, 'jwt_secret_key');
        } catch (error) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        // Check if decoded email exists
        if (!decodedEmail || !decodedEmail.email) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        // Hash the new password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Update the user's password based on the decoded email
        const changePassword = await User.findOneAndUpdate({ email: decodedEmail.email }, { password: hashedPassword });

        if (!changePassword) {
            return res.status(400).json({ success: false, message: 'Password reset failed' });
        }

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  

  module.exports = {
    registration,
    login,
    resetPassword,
    newPassword
  }