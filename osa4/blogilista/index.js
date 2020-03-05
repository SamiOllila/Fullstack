const app = require('./app')
const logger = require('./utils/logger')
const { MONGODB_URI, PORT } = require('./utils/config')

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})