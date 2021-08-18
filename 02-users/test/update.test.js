const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let hatem

  beforeEach((done) => {
    hatem = new User({ name: 'Hatem' })
    hatem.save().then(() => done())
  })

  const assertName = (operation, done) => {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].name === 'Hossam')
        done()
      })
  }

  it('instance based set n save', (done) => {
    hatem.set({ name: 'Hossam' }) // Change it in memory NOT in Database, so no async needed!
    assertName(hatem.save(), done)
  })

  it('instance method updateOne', (done) => {
    assertName(hatem.updateOne({ name: 'Hossam' }), done)
  })
})
