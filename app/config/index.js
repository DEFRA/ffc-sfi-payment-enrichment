const Joi = require('joi')
const mqConfig = require('./mq-config')
const dbConfig = require('./db-config')

// Define config schema
const schema = Joi.object({
  env: Joi.string().valid('development', 'test', 'production').default('development')
})

// Build config
const config = {
  env: process.env.NODE_ENV
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'
value.paymentSubscription = mqConfig.paymentSubscription
value.processingTopic = mqConfig.processingTopic
value.dbConfig = dbConfig

module.exports = value
