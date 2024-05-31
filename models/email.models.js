const {Schema, model} = require('mongoose');

const emailSchmea = new Schema({
    companyName:  {
        type: String,
        required: true,
        maxLength: 40
    },

    companyType: {
        type: String,
        required: true,
    },

    firstEmail: {
        type: String,
        required: true,
        maxLength: 50
    },

    secondEmail: {
        type: String,
        maxLength: 50
    },

    thirdEmail: {
        type: String,
        maxLength: 50
    },

    carrersPage: {
        type: String,
    }

}, {
    timestamps: true
})

const Emails = model('Email', emailSchmea);
module.exports = Emails