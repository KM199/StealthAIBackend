const express       = require('express')
const mongoose      = require('mongoose')
const morgan        = require('morgan')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const cookieParser  = require('cookie-parser')

const UserRoute     = require('./routes/user')
const refreshRoute  = require('./routes/refresh')

const env = require('./.env')
const dbURL = env.mongoURL

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err => {
    console.log(err)
}))

db.once('open', () => {
    console.log('Database Connection Established!')
})

const app = express()

app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/user', UserRoute)
app.use('/api/refresh', refreshRoute)