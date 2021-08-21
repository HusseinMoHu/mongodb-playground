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
})

userSchema.virtual('postCount').get(function () {
  return this.posts.length
})

const User = mongoose.model('User', userSchema)

module.exports = User
