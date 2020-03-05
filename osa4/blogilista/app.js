const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const { MONGODB_URI, PORT } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = MONGODB_URI
logger.info(`Connecting to MongoDB...`)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app