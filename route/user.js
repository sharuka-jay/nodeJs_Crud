const express = require('express')
const router = express.Router()

const UserController = require('../controller/UserController')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, UserController.index)
router.post('/show',UserController.show)
// router.post('/store',UserController.store)
router.get('/login',UserController.login)
// router.post('/login',UserController.register)
router.get('/register',UserController.register)



// const authenticate = require('../middleware/authenticate')

module.exports = router