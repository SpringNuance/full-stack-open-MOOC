const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://SpringNuance:hansjohn@cluster0.oauge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  //`mongodb+srv://fullstack:${password}@cluster0.ostce.mongodb.net/fs2021-notes?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: "Hello",
  author: "Nuance",
  url: "https://123",
  likes: 123
})

/*
note.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})

/*


*/