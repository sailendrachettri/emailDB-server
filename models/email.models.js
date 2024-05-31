const {Schema, model} = require('mongoose');

const emailSchmea = new Schema({
    companyName:  {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 40
    },

    companyType: {
        type: String,
        required: true,
    },

    firstEmail: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },

    secondEmail: {
        type: String,
        unique: true,
        maxLength: 50
    },

    thirdEmail: {
        type: String,
        unique: true,
        maxLength: 50
    },

    carrersPage: {
        type: String,
        maxLength: 50
    }

}, {
    timestamps: true
})

const Emails = model('Email', emailSchmea);
module.exports = Emails