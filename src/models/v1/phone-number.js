const mongoose = require("mongoose");
const validator = require("validator");

const phoneNumberSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error(`Invalid phone number ${value}`);
            }
        }
    },
    countryIso2: {
        type: String,
        required: true,
        trim: true,
    },
    countryIso3: {
        type: String,
        required: true,
        trim: true,
    },
    countryCode: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

module.exports = PhoneNumber;