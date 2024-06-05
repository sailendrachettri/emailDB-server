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
        maxLength: 50
    },

    thirdEmail: {
        type: String,
        maxLength: 50
    },

    careerPage: {
        type: String,
        maxLength: 50
    }

}, {
    timestamps: true
})

const Emails = model('Email', emailSchmea);
module.exports = Emails