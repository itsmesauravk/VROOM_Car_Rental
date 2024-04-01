const express = require('express')
const router = express.Router()

const {
    registration ,
    login
} = require('../controller/LoginRegister')


router.route('/register').post(registration)
router.route('/login').post(login)


module.exports = router