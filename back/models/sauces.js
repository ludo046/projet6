const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, require: true},
    name: {type: String, require: true},
    manufacturer: {type: String, require: true},
    description: {type: String, require: true},
    mainPepper: {type: String, require: true},
    imageUrl: {type: String, require: true},
    heat: {type: Number, require: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLiked: {type: Array, default: []},
    usersDisliked: {type: Array, default: []}
})
module.exports = mongoose.model('Sauce', sauceSchema)