//for user
const User = require('../schema/User')
//for admin
const Admin = require('../schema/Admin')
// Distributor
const Distributor = require('../schema/Distributor');
// Rental Client
const RentalClient = require('../schema/AddCar');




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


//displaying all the distributors location
const showDistributorsLocations = async(req,res)=>{
    try{
        const distributors = await Distributor.find();
        const DistributorLocation = distributors.map(distributor => distributor.distributionLocation)
        res.status(200).json({success:true, DistributorLocation})
    }catch(error){
        console.error('Error showing distributors:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

}

const showRentalClients = async (req, res) => {
    try {
      const rentalClients = await RentalClient.find();
      res.status(200).json({ success: true, rentalClients });
    } catch (error) {
      console.error('Error showing rental clients:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }



module.exports = { 
    showUsers,
    showDistributors,
    showDistributorsLocations,
    showRentalClients
  };