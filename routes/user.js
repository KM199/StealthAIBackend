const express       = require('express')
const router        = express.Router()

const UserController    = require('../controllers/UserController')
const authenticate      = require('../middleware/authenticate')
const logoutController  = require('../controllers/logoutController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', UserController.index)
router.post('/show', authenticate, UserController.show)
router.post('/logout', authenticate, logoutController.handleLogout)
router.post('/logoutall', authenticate, logoutController.handleLogoutAll)



module.exports = router