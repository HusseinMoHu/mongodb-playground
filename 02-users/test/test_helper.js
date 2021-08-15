const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/users_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Good to go!'))

beforeEach(() => {
  mongoose.connection.collections.users.drop()
})
