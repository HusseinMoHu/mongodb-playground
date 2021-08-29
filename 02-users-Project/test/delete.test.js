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

  it('class method deleteMany', (done) => {
    // Remove a bunch of records with some given criteria
    User.deleteMany({ name: 'Hatem' })
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findOneAndDelete', (done) => {
    User.findOneAndDelete({ name: 'Hatem' })
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findByIdAndDelete', (done) => {
    User.findByIdAndDelete(hatem._id)
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })
})
