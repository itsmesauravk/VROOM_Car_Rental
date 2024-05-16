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
    registerDistributor,
    distributorProfileMiddleware,
    updateUserProfile,
    userProfileMiddleware
} = require('../controller/LoginRegister')

//Importing from controller.js
const{
    showUsers,
    showDistributors,
    showDistributorsLocations,
    showRentalClients,
    showDistributorRentalCars
} = require('../controller/controller')

// Importing from Booking.js
const {
    createRequest,
    showRequest,
    showUserRequestStatus,
    deleteRentRequest,
    acceptRejectRequest,
    
    reAvilableCars,
    confirmRequestUser,
    rejectConfirmRequest
} = require('../controller/Booking')

// Importing from RentalClient
const {
    addNewClient,
    addNewClientMiddleware,
    getCarsDetails,
    getAllCars,
    deleteRentalClient,
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

    //confirming the request
    router.route('/confirm-request-user/:id').patch(confirmRequestUser)

//updating user profile
router.route('/update-user-info').patch(userProfileMiddleware,updateUserProfile)



//distributor routes
router.route('/register-distributor').post(distributorProfileMiddleware,registerDistributor)
router.route('/show-user-request-status/:id').get(showUserRequestStatus)
router.route('/distributor-info').get(distInfo)
router.route('/show-distributors-locations').get(showDistributorsLocations)

    //for  rental client
router.route('/add-rental-client').post(addNewClientMiddleware,addNewClient)
router.route('/get-cars-details/:id').get(getCarsDetails)
router.route('/get-dist-cars').get(showDistributorRentalCars)
   //for re avialabling the cars
router.route('/update-rental-car-status/:id').patch(reAvilableCars)

    //deleting rental clients
router.route('/delete-rental-client/:id').delete(deleteRentalClient)

        //request actions
router.route('/accept-reject-request/:id').patch(acceptRejectRequest)
router.route('/reject-confirm-request/:id').patch(rejectConfirmRequest)



//admin routes
router.route('/register-admin').post(registerAdmin)
router.route('/admin-info').get(adminInfo) 

    //showing for dashboard
router.route('/show-users').get(showUsers)
router.route('/show-total-rental-clients').get(showRentalClients)
router.route('/show-distributors').get(showDistributors)
// router.route('/show-all-cars').get(getAllCars)



// Handling the user request
router.route('/create-request').post(createRequest)
router.route('/show-request/:id').get(showRequest)
router.route('/delete-rent-request/:id').delete(deleteRentRequest)


//edit delete handler
router.route('/edit-delete-handler/:id').delete(editDelete)
































































module.exports = router