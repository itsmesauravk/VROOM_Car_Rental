const express = require('express')
const router = express.Router()

const {
    registration ,
    login,
    resetPassword,
    newPassword,
    userInfo
} = require('../controller/LoginRegister')


router.route('/register').post(registration)
router.route('/login').post(login)
router.route('/reset-password-mail').post(resetPassword)
router.route('/reset-password').post(newPassword)

router.route('/user-info').get(userInfo)


module.exports = router