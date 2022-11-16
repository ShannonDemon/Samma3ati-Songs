const express = require('express')
const router = express.Router()
const favoritesController = require('../controllers/favorites')


router.post('/favorites', favoritesController.addToFavorites)


module.exports = router