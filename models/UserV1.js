const mongoose      = require('mongoose')
const Schema        = mongoose.Schema

const userSchema    = new Schema({
    version: {
        type: Number
    },
    username: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    emailVerified: {
        type: Boolean
    },
    phoneAreaCode: {
        type: Number
    },
    phone9Digit: {
        type: Number
    },
    phoneVerified: {
        type: Boolean
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String
    },
    loginLogs:{
        type: Array
    },
    privateData: {
        type: Array
    },
    publicData: {
        type: Array
    }
}, {timestapms: true})

const UserV1 = mongoose.model('User', userSchema)
module.exports = UserV1
