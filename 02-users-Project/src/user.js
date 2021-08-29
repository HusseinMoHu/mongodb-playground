const mongoose = require('mongoose')
const postSchema = require('./post')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
    required: [true, 'Name is required.'],
  },
  posts: [postSchema],
  likes: Number,
  blogPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost',
    },
  ],
})

userSchema.virtual('postCount').get(function () {
  return this.posts.length
})

userSchema.pre('remove', function (next) {
  const user = this
  const BlogPost = mongoose.model('BlogPost')

  BlogPost.deleteMany({ _id: { $in: user.blogPosts } }).then(() => next())
})

const User = mongoose.model('User', userSchema)

module.exports = User
