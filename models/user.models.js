const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 34,
        lowercase: true
    },

    password: {
        type: String, 
        required: true,
        maxLength: 256
    }
},
    { timestamps: true }
);

const User = model('User', userSchema);
module.exports = User