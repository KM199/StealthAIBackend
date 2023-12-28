Install Instructions

- npm install
- npm update

Requires a .env file
Include this inside it

module.exports = {
secretKey: process.env.SECRET_KEY || 'password',
mongoURL: process.env.MONGO_URL || 'databaselink'
}

Run Instructions

- npm start
