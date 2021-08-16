const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let hatem

  beforeEach((done) => {
    hatem = new User({ name: 'hatem' })
    hatem.save().then(() => done())
  })

  it('finds all users with a name of hatem', (done) => {
    User.find({ name: 'hatem' }).then((users) => {
      // When comparing _id, we need to convert them to strings
      // Because _id for the same document differs in mongodb from mongoose
      assert(users[0]._id.toString() == hatem._id.toString())
      done()
    })
  })
})
