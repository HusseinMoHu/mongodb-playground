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

  it('class method updateOne', (done) => {
    assertName(User.updateOne({ name: 'Hatem' }, { name: 'Hossam' }), done)
  })

  it('class method findOneAndUpdate', (done) => {
    assertName(
      User.findOneAndUpdate(
        { name: 'Hatem' },
        { name: 'Hossam' },
        { useFindAndModify: false } // option
      ),
      done
    )
  })

  it('class method findByIdAndUpdate', (done) => {
    assertName(
      User.findByIdAndUpdate(
        hatem._id,
        { name: 'Hossam' },
        { useFindAndModify: false } // option
      ),
      done
    )
  })

  it('class method updateMany', (done) => {
    assertName(User.updateMany({ name: 'Hatem' }, { name: 'Hossam' }), done)
  })
})
