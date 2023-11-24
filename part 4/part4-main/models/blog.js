const mongoose = require('mongoose')

/*
Everything in Mongoose starts with a Schema. 
Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
*/

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//Creating a model
//To use our schema definition, we need to convert our noteSchema into a Model we can work with. 
// To do so, we pass it into mongoose.model(<modelName>, noteSchema):
module.exports = mongoose.model('Blog', blogSchema)
