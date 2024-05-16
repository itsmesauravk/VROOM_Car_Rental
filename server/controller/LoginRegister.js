// Import necessary modules and packages
const User = require('../schema/User'); // Importing User schema for database operations related to users
const bcrypt = require('bcrypt'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // JSON Web Token implementation for authentication
const nodemailer = require('nodemailer'); // Library for sending emails
const multer = require('multer'); // Middleware for handling file uploads
const express = require('express'); // Web framework for Node.js
const app = express(); // Initialize Express application

const path = require('path'); // Core Node.js module for handling file paths

// Importing schemas for different types of users
const Admin = require('../schema/Admin'); // Schema for admin users
const Distributor = require('../schema/Distributor'); // Schema for distributor users

// Multer storage configuration for distributor images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory for saving distributor images
    cb(null, './uploads/distributors');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp and a random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Append the original extension to the filename to maintain file type
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// Multer instance for handling file uploads with specified storage configuration
const upload = multer({ storage: storage });

// Middleware to serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware to parse urlencoded request bodies
app.use(express.urlencoded({ extended: false }));

// Middleware for handling distributor profile picture uploads
const distributorProfileMiddleware = upload.single('profilePicture');

// Multer storage configuration for user images
const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory for saving user images
    cb(null, './uploads/users');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp and a random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Append the original extension to the filename to maintain file type
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// Multer instance for handling user file uploads with specified storage configuration
const uploadUser = multer({ storage: storageUser });

// Middleware for serving static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware for parsing urlencoded request bodies
app.use(express.urlencoded({ extended: false }));

// Middleware for handling user profile picture uploads
const userProfileMiddleware = uploadUser.single('userPhoto');

// User registration route
const registration = async (req, res) => {
    try {
      // Extract necessary user registration data from request body
      const { fullname, email, phone, password, address } = req.body;

      // Generate a salt and hash the password using bcrypt for secure storage
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // If the email already exists, return a response indicating failure
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
  
      // Create a new user instance with hashed password for registration
      const newUser = new User({
        fullname,
        email,
        phone,
        password: hashedPassword, 
        address,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Return a success response with the newly registered user information
      res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
      // If an error occurs during registration, log the error and return a server error response
      console.error('Error registering user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

 // User login route
const login = async (req, res) => {
  try {
    // Extract email and password from request body
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

    // Extract user role and ID
    const role = user.role;
    const id = user._id;

    // Generate JWT token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Set the token in a cookie for subsequent requests
    res.cookie("token", token, { httpOnly: true });

    // Respond with success message, token, user ID, and role
    res.status(200).json({ success: true, message: 'User logged in successfully', token, id, role });
  } catch (error) {
    // Handle any errors that occur during login process
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Password reset request route
const resetPassword = async (req, res) => {
  try {
      const {email} = req.body;
      
      // Check if the provided email exists in the database
      const checkEmail = await User.findOne({ email });
      if (!checkEmail) {
          return res.status(400).json({ success: false, message: 'Email does not exist' });
      }

      // Generate a JWT token with the email payload for password reset link
      const token = jwt.sign({ email }, 'jwt_secret_key', { expiresIn: '1h' });

      // Create a transporter for sending emails
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sanjeetkazithapa@gmail.com',
          pass: 'zthh seqb uboc cdin'
        },
        connectionTimeout: 60000
      });

      // Define email content and options
      const mailOptions = {
        from: 'sanjeetkazithapa@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`
      };

      // Send the email with password reset link
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
  } catch (error) {
      // Handle errors that occur during password reset request
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
  }
};


// Route for setting new password after password reset
const newPassword = async (req, res) => {
  try {
      const { password, token } = req.body;

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

      // Check if password reset was successful
      if (!changePassword) {
          return res.status(400).json({ success: false, message: 'Password reset failed' });
      }

      // Respond with success message if password reset was successful
      res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
      // Handle any errors that occur during password reset process
      console.error('Error resetting password:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
  
// Function to get information of the logged-in user
const userInfo = async(req, res) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(' ')[1];
    // Decode the token to get user ID
    const tokenDecoded = await jwt.verify(token, process.env.JWT_SECRET);
    // Find user by ID in the database
    const user = await User.findById(tokenDecoded.id);
    // If user not found, return error
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    // Respond with success and user data
    res.status(200).json({ success: true, user });
  } catch (error) {
    // Handle errors
    // console.error('Error getting user data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Function to get information of the logged-in distributor
const distInfo = async(req, res) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(' ')[1];
    // Decode the token to get distributor ID
    const tokenDecoded = await jwt.verify(token, process.env.JWT_SECRET);
    // Find distributor by ID in the database
    const dist = await Distributor.findById(tokenDecoded.id);
    // If distributor not found, return error
    if (!dist) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    // Respond with success and distributor data
    res.status(200).json({ success: true, dist });
  } catch (error) {
    // Handle errors
    console.error('Error getting dist data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Function to get information of the logged-in admin
const adminInfo = async(req, res) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(' ')[1];
    // Decode the token to get admin ID
    const tokenDecoded = await jwt.verify(token, process.env.JWT_SECRET);
    // Find admin by ID in the database
    const admin = await Admin.findById(tokenDecoded.id);
    // If admin not found, return error
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Admin not found' });
    }
    // Respond with success and admin data
    res.status(200).json({ success: true, admin });
  } catch (error) {
    // Handle errors
    console.error('Error getting admin data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Function to register a new admin
const registerAdmin = async (req, res) => {
  try {
    // Extract admin information from request body
    const { fullname, email, password } = req.body;
    // Hash the password for security
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // Check if the email already exists in the database
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    // Create a new admin instance for admin registration
    const newAdmin = new Admin({
      fullname,
      email,
      password: hashedPassword, 
    });
    // Save the admin to the database
    await newAdmin.save();
    // Respond with success message and admin data
    res.status(201).json({ success: true, message: 'Admin registered successfully', admin: newAdmin });
  } catch (error) {
    // Handle errors
    console.error('Error registering admin:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Function to register a new distributor
const registerDistributor = async (req, res) => {
  try {
    // Extract distributor information from request body
    const { fullname, address, phone, distributionLocation, email, password } = req.body;
    // Extract profile picture path from request file
    const profilePicture = req.file.path;
    // Hash the password for security
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // Check if the email already exists in the database
    const existingDistributor = await Distributor.findOne({ email });
    if (existingDistributor) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    // Create a new distributor instance for distributor registration
    const newDistributor = new Distributor({
      profilePicture,
      fullname,
      address,
      phone,
      distributionLocation,
      email,
      password: hashedPassword, 
    });
    // Save the distributor to the database
    await newDistributor.save();
    // Respond with success message and distributor data
    res.status(201).json({ success: true, message: 'Distributor registered successfully', distributor: newDistributor });
  } catch (error) {
    // Handle errors
    console.error('Error registering distributor:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


// const token = req.headers.authorization.split(' ')[1];
// const userPhoto = req.file.path;



// Function to update user profile
const updateUserProfile = async (req, res) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(' ')[1];  //added split to get token
    // Decode the token to get user ID
    const tokenDecoded = await jwt.verify(token, process.env.JWT_SECRET);
    // Find user by ID in the database
    const user = await User.findById(tokenDecoded.id);
    // If user not found, return error
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    // Extract updated user information from request body
    const { fullname, email, phone, address, newPassword } = req.body;
    // Extract user photo path from request file

    const userPhoto = req.file.path; //updated path for adding photo
    // Hash the new password for security
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    // Update user's information in the database
    const updatedUser = await User.findByIdAndUpdate(tokenDecoded.id, { photo: userPhoto, fullname, email, phone, address, password: hashedPassword }, { new: true });
    // Respond with success message and updated user data
    res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    // Handle errors
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Exporting functions to be used in routes
module.exports = {
  registration,
  login,
  resetPassword,
  newPassword,
  userInfo,
  distInfo,
  adminInfo,
  registerAdmin,
  registerDistributor,
  distributorProfileMiddleware,
  updateUserProfile,
  userProfileMiddleware
}