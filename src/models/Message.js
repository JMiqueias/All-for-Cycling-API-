const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    content_msg: {
        type: String,
        required: true,
    },
});

const Message = mongoose.model("Message",UserSchema);


module.exports = Message;