const express = require('express')
const driverRoutes = require('./routes/driverRoutes')

const app = express()
app.use(express.json())

// Routes
driverRoutes(app)

module.exports = app
