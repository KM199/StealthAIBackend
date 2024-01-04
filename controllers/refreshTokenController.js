const User      = require('../models/UserV1')
const jwt       = require('jsonwebtoken')

const env = require('../.env')
const accessTTL = env.accessTTL
const accessSecret = env.accessSecret
const refreshSecret = env.refreshSecret


const handleRefreshToken = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401)
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        refreshSecret,
        (err, decoded) => {
            User.findOne({username:decoded.username})
            .then(User => { 
                if (err || User.username !== decoded.username || User.refreshToken !== refreshToken) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {username: decoded.username},
                    accessSecret,
                    {expiresIn: accessTTL}
                )
            res.json({accessToken})
            })
            .catch(error => {
                res.sendStatus(403); //Forbidden
            })
            
        }
    )
}

module.exports = { handleRefreshToken }