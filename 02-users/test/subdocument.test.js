const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('Can create subdocument', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'postTitle' }] })

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'postTitle')
        done()
      })
  })
})
