const mongoose = require('mongoose')
const Favorite = require('./Favorite')

const schema = mongoose.Schema


const UserModel = new schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    // Associate the favorite model
    favorite: [{
        type: schema.Types.ObjectId,
        ref: 'Favorite'
        }]
}, {
    timestamps: true
})


const User = mongoose.model('User', UserModel)

module.exports = User