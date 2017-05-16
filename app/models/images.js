// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var images = mongoose.Schema({
    userId: String,
    url: String,
    caption: String,
    likes: Number,
    icon: String,
    users: [String]
});

// create the model for images and expose it to our app
module.exports = mongoose.model('Image', images);
