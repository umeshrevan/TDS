const express = require('express')
require('../database/dbConnect')
//const routerBrands = express.Router()
const router = express.Router()

const { createUser} = require('../controller/userController')
const { createPassbook } = require('../controller/passbookController')
//const { transferAmount, automaticTransfer, userSignup, incrementAmount } = require('../controller/transactionController')

router.post('/createUser', createUser)
router.post('/createPassbook', createPassbook)
// router.post('/automaticTransfer', automaticTransfer)
// router.post('/userSignup', userSignup)
// router.post('/incrementAmount', incrementAmount)



module.exports = router