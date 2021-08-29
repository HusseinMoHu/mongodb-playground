const mongoose = require('mongoose')
const albumSchema = require('./album')

const artistSchema = new mongoose.Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    website: String,
    netWorth: Number,
    labelName: String,
    retired: Boolean,
    albums: [albumSchema]
})

const Artist = mongoose.model('Artist', artistSchema)