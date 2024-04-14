//for user
const User = require('../schema/User')
//for admin
const Admin = require('../schema/Admin')
// Distributor
const Distributor = require('../schema/Distributor');
const { model } = require('mongoose');




// Show all the Users
const showUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error('Error showing users:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }


// Show all the Distributors
const showDistributors = async (req, res) => {
    try {
      const distributors = await Distributor.find();
      res.status(200).json({ success: true, distributors });
    } catch (error) {
      console.error('Error showing distributors:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }




module.exports = { 
    showUsers,
    showDistributors 
};