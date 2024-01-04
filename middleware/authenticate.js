const jwt       = require('jsonwebtoken')

const env = require('../.env')
const accessSecret = env.accessSecret
const refreshSecret = env.refreshSecret

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decode = jwt.verify(token, accessSecret)

    req.data = decode
    next()
    }
  catch(error) {
    res.json({
      message: error.message
    })
  }
}

module.exports = authenticate