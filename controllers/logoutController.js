const User      = require('../models/UserV1')
const jwt       = require('jsonwebtoken')

//Cookie deletion needs testing on website

const handleLogout = (req, res, next) => {
    //On Client also delete access token
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)

    console.log(cookies.jwt)
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true}) //Options must match the cookie

    User.findOne({username:req.data.username})
    .then(User => { 
        User.refreshToken = User.refreshToken.slice(-2)
        if (User.refreshToken.length == 1) {
            User.refreshToken = []
        }
        else if (User.refreshToken[0] == refreshToken) {
            User.refreshToken = [User.refreshToken[1]]
        }
        else if (User.refreshToken[1] == refreshToken) {
            User.refreshToken = [User.refreshToken[0]]
        }
        console.log(User.refreshToken)
        User.save().then(user => {
            console.log("Saved!")
        })
        .catch(error => {
            console.log("Error Logging Login")
        })
        res.sendStatus(204);
    })
    .catch(error => {
        res.sendStatus(204);
    })
}

const handleLogoutAll = (req, res, next) => {
    //Log User out on all devices
    //On Client also delete access token
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)

    console.log(cookies.jwt)
    const refreshToken = cookies.jwt;

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true})

    User.findOne({username:req.data.username})
    .then(User => { 
        User.refreshToken = []
        User.save().then(user => {
            console.log("Saved!")
        })
        .catch(error => {
            console.log("Error Logging Login")
        })
        res.sendStatus(200);
    })
    .catch(error => {
        res.sendStatus(204);
    })
}

module.exports = { handleLogout, handleLogoutAll }