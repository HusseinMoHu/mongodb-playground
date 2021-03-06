const mongoose = require('mongoose')

before((done) => {
  mongoose.connect('mongodb://localhost:27017/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.once('open', () => done())
  mongoose.connection.on('error', (error) => console.error(error))
})

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
})
