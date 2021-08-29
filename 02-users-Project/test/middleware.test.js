const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware', () => {
  let hatem, blogPost

  beforeEach((done) => {
    hatem = new User({ name: 'Hatem' })
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yep it really is',
    })

    hatem.blogPosts.push(blogPost)

    Promise.all([hatem.save(), blogPost.save()]).then(() => done())
  })

  it('users clean up dangling blogposts on remove', (done) => {
    hatem
      .remove()
      .then(() => BlogPost.countDocuments())
      .then((count) => {
        assert(count === 0)
        done()
      })
  })
})
