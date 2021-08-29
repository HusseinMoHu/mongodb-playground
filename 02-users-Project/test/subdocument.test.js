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

  it('Add subdocument to an existing record', (done) => {
    const hatem = new User({ name: 'Hatem', posts: [] })

    hatem
      .save()
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  it('can remove an existing subdocument', (done) => {
    const hatem = new User({ name: 'Hatem', posts: [{ title: 'New Title' }] })

    hatem
      .save()
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        const post = user.posts[0]
        // remove() -> When it comes to subdocument, it's not async operation
        // it's not gonna saves the document to Database
        post.remove()

        return user.save()
      })
      .then(() => User.findOne({ name: 'Hatem' }))
      .then((user) => {
        assert(user.posts.length === 0)
        done()
      })
  })
})
