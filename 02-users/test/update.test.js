const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let hatem

  beforeEach((done) => {
    hatem = new User({ name: 'Hatem' })
    hatem.save().then(() => done())
  })

  it('instance based set n save', (done) => {
    hatem.set({ name: 'Hossam' })
    hatem
      .save()
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].name === 'Hossam')
        done()
      })
  })
})
