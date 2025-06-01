const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    members: {
        type:[
            {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
        ],
        required: true
    },

    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    },
    unreadMessageCount: {
        type: Number,
        default: 0
    },

 
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('chats', chatSchema);
// chats is the name of the collection name in the database
