const express = require('express')
const router = express.Router()

const {
    registration 
} = require('../controller/LoginRegister')


router.route('/register').post(registration)


module.exports = router