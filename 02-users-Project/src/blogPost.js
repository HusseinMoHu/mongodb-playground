const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

const BlogPost = mongoose.model('BlogPost', blogPostSchema)

module.exports = BlogPost
