const User      = require('../models/UserV1')
const jwt       = require('jsonwebtoken')

const env = require('../.env')
const accessTTL = env.accessTTL
const accessSecret = env.accessSecret
const refreshSecret = env.refreshSecret


const handleRefreshToken = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        refreshSecret,
        (err, decoded) => {
            User.findOne({username:decoded.username})
            .then(User => { 
                //If error, or username mismatch, return error
                if (err || User.username !== decoded.username) return res.sendStatus(403);
                //Cut list of refreshTokens down to the last two issued
                User.refreshToken = User.refreshToken.slice(-2)
                //Check that this refreshToken is on the list of allowed refreshTokens
                if (!(User.refreshToken[0] == refreshToken || User.refreshToken[1] == refreshToken)) return res.sendStatus(403);
                //Potentialy could impliment more security here, ex making sure the ipadress hasn't changed, etc ...
                //Save the User (updates the refreshToken array)
                User.save().then(user => {
                    console.log("User Saved!")
                })
                .catch(error => {
                    console.log("Error saving User")
                })
                //Create accessToken
                const accessToken = jwt.sign(
                    {username: decoded.username},
                    accessSecret,
                    {expiresIn: accessTTL}
                )
            //send accessToken
            res.json({accessToken})
            })
            .catch(error => {
                res.sendStatus(403); //Forbidden
            })
            
        }
    )
}

module.exports = { handleRefreshToken }