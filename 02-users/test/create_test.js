const assert = require('assert')
const User = require('../src/user')

describe('Create records', () => {
  it('saves a user', () => {
    const hatem = new User({
      name: 'hatem',
    })
    hatem.save()
  })
})
