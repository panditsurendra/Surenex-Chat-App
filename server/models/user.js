const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        // select : false, // This will exclude the password field from queries by default
        minilength: 6 // Minimum length for password
    },
    profilePic: {
        type: String,
        // default: 'default.jpg'
        required: false,
    },
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('users', userSchema);
// users is the name of the collection name in the database

