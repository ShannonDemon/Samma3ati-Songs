const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')


router.post('/users', usersController.createUser)

router.get('/users', usersController.getAllUsers)

router.post('/auth/signin', usersController.auth_sigin_post)
router.get('/fav/:id', usersController.fav_get)


module.exports = router