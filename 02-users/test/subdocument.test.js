const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('Can create subdocument', (done) => {
    const hatem = new User({ name: 'Hatem', posts: [{ title: 'postTitle' }] })

    hatem
      .save()
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        assert(user.posts[0].title === 'postTitle')
        done()
      })
  })
})
