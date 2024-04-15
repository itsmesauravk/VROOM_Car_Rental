const express = require('express')
const router = express.Router()


// Importing from LoginRegister.js
const {
    registration ,
    login,
    resetPassword,
    newPassword,
    userInfo,
    registerAdmin,
    registerDistributor
} = require('../controller/LoginRegister')

//Importing from controller.js
const{
    showUsers,
    showDistributors
} = require('../controller/controller')

// Importing from Booking.js
const {
    createRequest
} = require('../controller/Booking')



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

//admin routes
router.route('/register-admin').post(registerAdmin)


// Handling the user request
router.route('/create-request').post(createRequest)




module.exports = router