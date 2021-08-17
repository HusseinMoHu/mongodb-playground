const assert = require('assert')
const User = require('../src/user')

describe('Create records', () => {
  it('saves a user', (done) => {
    const hatem = new User({
      name: 'Hatem',
    })

    hatem.save().then(() => {
      // Has hatem been saved successfully?
      assert(!hatem.isNew)
      done()
    })
  })
})
