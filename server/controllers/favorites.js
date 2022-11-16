const User = require('../models/User')
const Favorite = require('../models/Favorite')
const jwt_decode = require('jwt-decode')

async function addToFavorites(req,res) {
try {
    console.log('function reached')
    const userId = jwt_decode(req.header('Authorization'))
    // console.log(userId)
    const user = await User.findById(userId.user.id)
    console.log('req body', req.body)
    // artist: {type: String},
    // title: {type: String},
    // uri: {type: String},
    // albumUrl: {type: String}

    const favorite = await Favorite.create(req.body[0])

    await user.favorite.push(favorite._id)

    await user.save()
    await user.populate('favorite')
    res.json(user)


} catch(err) {
    console.log(err)
    res.json(err)
    }
}

// function deleteFavorite {
// await Favorite.findByIdAndDelete(...)
// }

module.exports = {
    addToFavorites
}
