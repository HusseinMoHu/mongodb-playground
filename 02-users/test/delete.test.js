const assert = require('assert')
const { findOneAndRemove } = require('../src/user')
const User = require('../src/user')

describe('Deleting a user', () => {
  let hatem

  beforeEach((done) => {
    hatem = new User({ name: 'Hatem' })
    hatem.save().then(() => done())
  })

  it('model instance remove', (done) => {
    hatem
      .remove()
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })
})
