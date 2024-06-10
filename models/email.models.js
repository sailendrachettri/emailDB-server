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

    companyLocation: {
        type: String,
        default: "",
        trim: true,
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

    mobile1:{
        type: String,
        maxLength: 10,
        minLength: 10,
        trim: true
    },
    mobile2:{
        type: String,
        maxLength: 10,
        minLength: 10,
        trim: true
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