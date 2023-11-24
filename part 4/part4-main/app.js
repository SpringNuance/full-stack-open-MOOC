const config = require('./utils/config') // import configs
const express = require('express') // creates express application
require('express-async-errors')
const app = express() // express() exports express application. Now app has express type
const cors = require('cors') // import cors. Needs npm install cors
const blogsRouter = require('./controllers/blogs') // import notes
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware') // import middlewares
const logger = require('./utils/logger') // import loggers
const mongoose = require('mongoose') // import mongoose. Needs npm install mongoose

logger.info('connecting to', config.MONGODB_URI)
/*
const info = (...params) => {
  console.log(...params)
}
const error = (...params) => {
  console.error(...params)
}
module.exports = {
  info, error
}
*/
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
/*
app.use is a way to register middleware or chain of middlewares (or multiple middlewares) 
before executing any end route logic or intermediary route logic depending upon order of 
middleware registration sequence.
*/

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
/*
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
*/

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

/*

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


*/