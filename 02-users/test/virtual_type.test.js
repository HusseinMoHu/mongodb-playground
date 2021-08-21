const assert = require('assert')
const User = require('../src/user')

describe('Virtual types', () => {
  it('postCount return number of posts', (done) => {
    const hatem = new User({
      name: 'Hatem',
      posts: [{ title: 'First Post' }, { title: 'Second Post' }],
    })

    hatem
      .save()
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        assert(user.postCount === 2)
        done()
      })
  })
})
