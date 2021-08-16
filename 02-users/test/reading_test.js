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
      assert(users.length === 1)
      assert(users[0].name === 'hatem')
      done()
    })
  })
})
