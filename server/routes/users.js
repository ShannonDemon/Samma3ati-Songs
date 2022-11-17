const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')


router.post('/users', usersController.createUser)

router.get('/users', usersController.getAllUsers)
router.get('/users/:userId', usersController.getUser)

router.post('/auth/signin', usersController.auth_sigin_post)
router.get('/fav/:id', usersController.fav_get)

router.put('/user/:id', usersController.updateUser)

module.exports = router