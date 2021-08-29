const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')
const Comment = require('../src/comment')

describe('Associations', () => {
  let hatem, blogPost, comment

  beforeEach((done) => {
    // Create three instance form three different models
    hatem = new User({ name: 'Hatem' })
    blogPost = new BlogPost({
      title: 'Js is Great',
      content: 'Yep it really is',
    })
    comment = new Comment({ content: 'congrats on great post' })

    // Associate them to each other
    hatem.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = hatem

    // Save the three operation in parallel, after finish trigger done
    Promise.all([hatem.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    )
  })

  it('saves a relation between a user and a blogPost', (done) => {
    User.findOne({ name: 'Hatem' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'Js is Great')
        done()
      })
  })

  it('saves full relation graph', (done) => {
    User.findOne({ name: 'Hatem' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User',
          },
        },
      })
      .then((user) => {
        assert(user.name === 'Hatem')
        assert(user.blogPosts[0].title === 'Js is Great')
        assert(
          user.blogPosts[0].comments[0].content === 'congrats on great post'
        )
        assert(user.blogPosts[0].comments[0].user.name === 'Hatem')
        done()
      })
  })
})
