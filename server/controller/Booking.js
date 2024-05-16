const Request = require('../schema/Requests')
const User = require('../schema/User')
const Distributor = require('../schema/Distributor')
const Cars = require('../schema/AddCar')

const jwt = require('jsonwebtoken')


// Create a new booking request
const createRequest = async (req, res) => {
    try {
        
        const { senderUser, receiverDistributor, bookingDetails } = req.body;
        // console.log(senderUser, receiverDistributor, bookingDetails)
        
        // Check if all required fields are provided
        if (!senderUser || !receiverDistributor || !bookingDetails) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        // Check if senderUser exists and is a user
        const isUser = await User.findById(senderUser);
        if (!isUser) {
            return res.status(400).json({ success: false, message: 'Sender must be a user' });
        }
        // console.log(isUser)

        // Check if receiverDistributor exists and is a distributor
        const isDistributor = await Distributor.findOne({ distributionLocation: receiverDistributor });
        if (!isDistributor) {
            return res.status(400).json({ success: false, message: 'Receiver must be a distributor' });
        }
        // console.log(isDistributor)

        // Extract distributorId from the found distributor
        const distributorId = isDistributor._id;
        // console.log(distributorId)

        // // Create a new request object
        const request = new Request({senderUser,receiverDistributor:distributorId,bookingDetails});
        
        // Save the request to the database
        await request.save();

        // Respond with a success message
        res.status(201).json({ success: true, message: 'Request created successfully' });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// request status to show the user
const showUserRequestStatus = async (req, res) => {
    try {
       const userId = req.params.id;
    //    console.log(distributorId)
        
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Id not provided' });
        }

        const requests = await Request.find({ senderUser: userId }).populate('receiverDistributor').populate('senderUser').populate('carId')
        .exec(); //to execute
        if (requests.length === 0) {
            return res.status(404).json({ success: false, message: 'No requests found' });
        }

        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        console.error('Error getting requests:', error);
        res.status(500).json({ success: false, message: 'Failed to get requests' });
    }
}


//for showing the requested data to the distributor
const showRequest = async (req, res) => {
    try {
       const distributorId = req.params.id;
    //    console.log(distributorId)
        
        if (!distributorId) {
            return res.status(401).json({ success: false, message: 'Id not provided' });
        }

        const requests = await Request.find({ receiverDistributor: distributorId }).populate('receiverDistributor').populate('senderUser')
        .exec(); //to execute
        if (requests.length === 0) {
            return res.status(404).json({ success: false, message: 'No requests found' });
        }

        res.status(200).json({ success: true, data: requests });
    } catch (error) {
        console.error('Error getting requests:', error);
        res.status(500).json({ success: false, message: 'Failed to get requests' });
    }
}


//deleting the rent requiest (user side)
const deleteRentRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        // console.log(requestId)
        if (!requestId) {
            return res.status(400).json({ success: false, message: 'Request ID not provided' });
        }

        await Request.findByIdAndDelete(requestId);
        res.status(200).json({ success: true, message: 'Request deleted successfully' });
    } catch (error) {
        console.error('Error deleting request:', error);
        res.status(500).json({ success: false, message: 'Failed to delete request' });
    }
}



//request actions

//accepting/ rejecting the request



const acceptRejectRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { action, carId } = req.body;
        if (!requestId || !action) {
            return res.status(400).json({ success: false, message: 'Request ID or status not provided' });
        }

        if(action === 'accept') {
            const reqAccept = await Request.findByIdAndUpdate(requestId, { 
                                status: 'Accepted',
                                carId: carId
                            });
             const updateCarStatus =  await Cars.findByIdAndUpdate(carId, { status: 'Pending' })

            if(!reqAccept) {
                return res.status(404).json({ success: false, message: 'Request not found' });
            }
            if(!updateCarStatus) {
                return res.status(404).json({ success: false, message: 'Car not found' });
            }

            return res.status(200).json({ success: true, message: 'Request accepted successfully' });
        }
        if(action === 'reject') {
            await Request.findByIdAndUpdate(requestId, { status: 'Rejected' });
            return res.status(200).json({ success: true, message: 'Request rejected successfully' });
        }
    }
    catch (error) {
        console.error('Error accepting/rejecting request:', error);
        res.status(500).json({ success: false, message: 'Failed to accept/reject request' });
    }
}

// rejecting at the final step by the user
const rejectConfirmRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { action, carId } = req.body;
        if (!requestId || !carId) {
            return res.status(400).json({ success: false, message: 'Request ID or status not provided' });
        }

    
        if(action === 'reject') {
            await Request.findByIdAndUpdate(requestId, { status: 'Rejected' });
            await Cars.findByIdAndUpdate(carId, { status: 'Available' });
            return res.status(200).json({ success: true, message: 'Request rejected successfully' });
        }
    }
    catch (error) {
        console.error('Error accepting/rejecting request:', error);
        res.status(500).json({ success: false, message: 'Failed to accept/reject request' });
    }
}

//last conformation of the request by the user
const confirmRequestUser = async (req, res) => {
    try {
        const carId = req.params.id;
        // console.log(carId)
        if (!carId) {
            return res.status(400).json({ success: false, message  : 'Request ID or status not provided' });
        }
        const confirm = await Cars.findByIdAndUpdate(carId, { status: 'Booked' });
        if(!confirm) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        return res.status(200).json({ success: true, message: 'Request confirmed successfully' , confirm});

    } catch (error) {
        console.error('Error accepting/rejecting request:', error);
        res.status(500).json({ success: false, message: 'Failed to accept/reject request' });
        
    }
}



//for re avilabling the rental cars
const reAvilableCars = async(req, res)=>{
    try {
        const carId = req.params.id;
        
        const checkCarStatus = await Cars.findById(carId)
        if(checkCarStatus.status === 'Available'){
            return res.status(400).json({ success: false, message: 'Car is already available' });
        }

        const car = await Request.findOneAndDelete({carId:carId})
        if(!car){
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        const updateCarStatus =  await Cars.findByIdAndUpdate(carId, { status: 'Available' })
        if(!updateCarStatus) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        res.status(200).json({ success: true, message: 'Car is now available' });
    } catch (error) {
        console.error('Error making car available:', error);
        res.status(500).json({ success: false, message: 'Failed to make car available' });     
    }
}








module.exports = {
     createRequest ,
        showRequest,
        showUserRequestStatus,
        deleteRentRequest,
        acceptRejectRequest,
        reAvilableCars,
        confirmRequestUser,
        rejectConfirmRequest
    }