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

userSchema.pre('remove', async function () {
  const user = this

  // to Dealing with cyclic Requires
  // mongoose.model() call will not be invoked until this function actually runs
  // as opposite to require() which grabbing model before everything else
  const BlogPost = mongoose.model('BlogPost')
})

const User = mongoose.model('User', userSchema)

module.exports = User
