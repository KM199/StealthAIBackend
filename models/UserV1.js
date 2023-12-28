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
    phone: {
        type: String
    },
    phoneVerified: {
        type: Boolean
    },
    password: {
        type: String
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
