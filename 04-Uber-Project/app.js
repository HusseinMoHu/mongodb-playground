const express = require('express')

const app = express()
// app.use(express.json())

app.get('/api', (req, res) => {
  res.send({ hi: 'there' })
})

module.exports = app
