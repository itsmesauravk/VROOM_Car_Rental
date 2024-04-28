const express = require('express')
const router = express.Router()


// Importing from LoginRegister.js
const {
    registration ,
    login,
    resetPassword,
    newPassword,
    userInfo,
    distInfo,
    adminInfo,
    registerAdmin,
    registerDistributor
} = require('../controller/LoginRegister')

//Importing from controller.js
const{
    showUsers,
    showDistributors,
    showDistributorsLocations
} = require('../controller/controller')

// Importing from Booking.js
const {
    createRequest,
    showRequest,
    showUserRequestStatus,
    deleteRentRequest
} = require('../controller/Booking')

// Importing from RentalClient
const {
    addNewClient,
    addNewClientMiddleware,
    getCarsDetails
} = require('../controller/RentalClient')


// editing - deleting user
const {
   editDelete 
} = require('../controller/EditDelete')



router.route('/register').post(registration)
router.route('/login').post(login)
router.route('/reset-password-mail').post(resetPassword)
router.route('/reset-password').post(newPassword)

//user routes
router.route('/user-info').get(userInfo)
router.route('/show-users').get(showUsers)



//distributor routes
router.route('/register-distributor').post(registerDistributor)
router.route('/show-distributors').get(showDistributors)
router.route('/distributor-info').get(distInfo)
router.route('/show-user-request-status/:id').get(showUserRequestStatus)

router.route('/show-distributors-locations').get(showDistributorsLocations)

    //for  rental client
router.route('/add-rental-client').post(addNewClientMiddleware,addNewClient)
router.route('/get-cars-details/:id').get(getCarsDetails)


//admin routes
router.route('/register-admin').post(registerAdmin)
router.route('/admin-info').get(adminInfo) 


// Handling the user request
router.route('/create-request').post(createRequest)
router.route('/show-request/:id').get(showRequest)
router.route('/delete-rent-request/:id').delete(deleteRentRequest)


//edit delete handler
router.route('/edit-delete-handler/:id').delete(editDelete)





module.exports = router