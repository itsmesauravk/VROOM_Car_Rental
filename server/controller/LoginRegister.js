const User = require('../schema/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

//for admin
const Admin = require('../schema/Admin')


// Distributor
const Distributor = require('../schema/Distributor')



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



  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let user;
  
      // Check if the email exists as a regular user
      user = await User.findOne({ email });
      if (!user) {
        // If not found, check if the email exists as a distributor
        const distributor = await Distributor.findOne({ email });
        if (distributor) {
          user = distributor;
        } else {
          // If still not found, check if the email exists as an admin
          const admin = await Admin.findOne({ email });
          if (admin) {
            user = admin;
          }
        }
      }
  
      // If user is still not found, return an error
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Verify password
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
  
      //checking the user role
      const role = user.role;
      const id = user._id;
      // console.log(role)

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
      // Set the token in a cookie
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ success: true, message: 'User logged in successfully', token,id, role });
    } catch (error) {
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



  //getting the loggedin user data
  const userInfo = async(req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const tokenDecoded =await jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(tokenDecoded.id)
      if(!user){
        return res.status(400).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, user });
    }
    catch (error) {
      console.error('Error getting user data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  //getting the loggedin distributor info
  //getting the loggedin user data
  const distInfo = async(req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const tokenDecoded =await jwt.verify(token, process.env.JWT_SECRET);
      const dist = await Distributor.findById(tokenDecoded.id)
      if(!dist){
        return res.status(400).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, dist });
    }
    catch (error) {
      console.error('Error getting user data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }


  //register admin
  const registerAdmin = async (req, res) => {
    try {
      const { fullname, email, password } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Check if the email already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
  
      // Create a new admin instance for admin registration
      const newAdmin = new Admin({
        fullname,
        email,
        password:hashedPassword, 
      });
  
      // Save the admin to the database
      await newAdmin.save();
  
      res.status(201).json({ success: true, message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
      console.error('Error registering admin:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }




  //register distributor
  const registerDistributor = async (req, res) => {
    try {
      const { fullname, address, phone, distributionLocation, email, password } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Check if the email already exists
      const existingDistributor = await Distributor.findOne({ email });
      if (existingDistributor) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
  
      // Create a new distributor instance for distributor registration
      const newDistributor = new Distributor({
        fullname,
        address,
        phone,
        distributionLocation,
        email,
        password:hashedPassword, 
      });
  
      // Save the distributor to the database
      await newDistributor.save();
  
      res.status(201).json({ success: true, message: 'Distributor registered successfully', distributor: newDistributor });
    } catch (error) {
      console.error('Error registering distributor:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  

  module.exports = {
    registration,
    login,
    resetPassword,
    newPassword,
    userInfo,
    distInfo,
    registerAdmin,
    registerDistributor
  }