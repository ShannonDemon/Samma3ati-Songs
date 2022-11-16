const mongoose = require('mongoose')

const Schema = mongoose.Schema
//Creating our Tweet Schema
const FavoriteModel = new Schema({
    // name: {type: String, required: true},
    // content: {type: String, required: true}
        // artist: track.artists[0].name,
        // title: track.name,
        // uri: track.uri,
        // albumUrl: smallestAlbumImage.url

        artist: {type: String},
        title: {type: String},
        uri: {type: String},
        albumUrl: {type: String}
}, {
    timestamps: true
})
//Storing our Schema as a model
const Favorite = mongoose.model('Favorite', FavoriteModel)
// Exporting our Model 
module.exports = Favorite;