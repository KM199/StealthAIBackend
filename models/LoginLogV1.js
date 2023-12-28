const mongoose      = require('mongoose')
const Schema        = mongoose.Schema
const ObjectId      = require('mongodb').ObjectId;


const LoginLogSchema    = new Schema({
    version: {
        type: Number
    },
    user: {
        type: ObjectId
    },
    ipAdress: {
        type: String
    },
}, {timestapms: true})

const UserV1 = mongoose.model('LoginLog', LoginLogSchema)
module.exports = UserV1
